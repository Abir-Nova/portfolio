/**
 * Shared DOM effects used by each routed page.
 *
 * Keep the HTML class names/IDs used here in your existing templates.
 * This avoids loading old .js scripts separately and registering duplicate listeners.
 */
export interface PageEffectOptions {
  reveal?: boolean;
  footer?: boolean;
  certifications?: boolean;
  education?: boolean;
  skills?: boolean;
  contact?: boolean;
  contactForm?: boolean;
}

export class PageEffects {
  private observers: IntersectionObserver[] = [];
  private cleanups: Array<() => void> = [];
  private timeouts: number[] = [];

  init(options: PageEffectOptions = {}): void {
    // Header mobile menu (if these elements exist on this page).
    const menuToggle = document.querySelector<HTMLButtonElement>('.menu-toggle');
    const navLinks = document.querySelector<HTMLElement>('.nav-links');

    if (menuToggle && navLinks) {
      const toggleMenu = (): void => {
        const isOpen = navLinks.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        document.body.classList.toggle('menu-open', isOpen);
      };
      const closeMenu = (): void => {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
      };
      menuToggle.addEventListener('click', toggleMenu);
      navLinks.querySelectorAll<HTMLAnchorElement>('a').forEach((link) => {
        link.addEventListener('click', closeMenu);
        this.cleanups.push(() => link.removeEventListener('click', closeMenu));
      });
      this.cleanups.push(() => menuToggle.removeEventListener('click', toggleMenu));
    }

    // General .reveal animation used across pages.
    if (options.reveal) {
      this.revealElements(document.querySelectorAll<HTMLElement>('.reveal'), 'is-visible', 0.12);
    }

    // Footer: current year, entrance reveal, scroll progress, back-to-top.
    if (options.footer) this.setupFooter();

    // About page certifications cards.
    if (options.certifications) {
      const cards = document.querySelectorAll<HTMLElement>('#certifs .certif-card');
      if (this.prefersReducedMotion() || !('IntersectionObserver' in window)) {
        cards.forEach((card) => card.classList.add('is-visible'));
      } else {
        const observer = this.makeObserver((entry) => {
          const card = entry.target as HTMLElement;
          const index = Number(card.dataset['revealIndex'] || 0);
          const timeout = window.setTimeout(() => card.classList.add('is-visible'), index * 120);
          this.timeouts.push(timeout);
        }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
        cards.forEach((card, index) => {
          card.dataset['revealIndex'] = String(index);
          observer.observe(card);
        });
      }
    }

    // About page education heading and timeline items.
    if (options.education) {
      const intro = document.querySelector<HTMLElement>('.education-intro');
      if (intro) this.revealElements([intro], 'is-visible', 0.15);
      const items = document.querySelectorAll<HTMLElement>('.education-item');
      if (this.prefersReducedMotion() || !('IntersectionObserver' in window)) {
        items.forEach((item) => item.classList.add('is-visible'));
      } else {
        const observer = this.makeObserver((entry) => {
          const item = entry.target as HTMLElement;
          item.style.transitionDelay = `${Number(item.dataset['index'] || 0) * 140}ms`;
          item.classList.add('is-visible');
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
        items.forEach((item, index) => {
          item.dataset['index'] = String(index);
          observer.observe(item);
        });
      }
    }

    // About page falling skills animation.
    if (options.skills) this.setupSkills();

    // Contact section entrance and link hover.
    if (options.contact) {
      const contact = document.querySelector<HTMLElement>('#contact');
      if (contact) this.revealElements([contact], 'is-contact-visible', 0.12);
      document.querySelectorAll<HTMLAnchorElement>('#contact .contact-links a').forEach((link) => {
        const enter = (): void => link.classList.add('is-hovered');
        const leave = (): void => link.classList.remove('is-hovered');
        link.addEventListener('pointerenter', enter);
        link.addEventListener('pointerleave', leave);
        this.cleanups.push(() => {
          link.removeEventListener('pointerenter', enter);
          link.removeEventListener('pointerleave', leave);
        });
      });
    }

    // Accessible status message when the contact form is submitted.
    if (options.contactForm) {
      const form = document.querySelector<HTMLFormElement>('#contact-form');
      const status = document.querySelector<HTMLElement>('#form-status');
      if (form && status) {
        const submit = (): void => { status.textContent = 'Opening your email client…'; };
        form.addEventListener('submit', submit);
        this.cleanups.push(() => form.removeEventListener('submit', submit));
      }
    }
  }

  destroy(): void {
    this.observers.forEach((observer) => observer.disconnect());
    this.observers = [];
    this.cleanups.forEach((cleanup) => cleanup());
    this.cleanups = [];
    this.timeouts.forEach((timeout) => window.clearTimeout(timeout));
    this.timeouts = [];
  }

  private prefersReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  private makeObserver(
    callback: (entry: IntersectionObserverEntry) => void,
    options: IntersectionObserverInit,
  ): IntersectionObserver {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        callback(entry);
        currentObserver.unobserve(entry.target);
      });
    }, options);
    this.observers.push(observer);
    return observer;
  }

  private revealElements(
    elements: NodeListOf<HTMLElement> | HTMLElement[],
    className: string,
    threshold: number,
  ): void {
    if (this.prefersReducedMotion() || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add(className));
      return;
    }
    const observer = this.makeObserver(
      (entry) => (entry.target as HTMLElement).classList.add(className),
      { threshold },
    );
    elements.forEach((element) => observer.observe(element));
  }

  private setupFooter(): void {
    const footer = document.querySelector<HTMLElement>('.footer');
    const year = document.querySelector<HTMLElement>('[data-current-year]');
    const progress = document.querySelector<HTMLElement>('.footer-progress span');
    const backToTop = document.querySelector<HTMLElement>('.footer-back-top');

    if (year) year.textContent = String(new Date().getFullYear());
    if (footer) this.revealElements([footer], 'is-footer-visible', 0.08);

    let ticking = false;
    const updateProgress = (): void => {
      if (progress) {
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const amount = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
        progress.style.width = `${Math.min(100, Math.max(0, amount))}%`;
      }
      ticking = false;
    };
    const onScroll = (): void => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    this.cleanups.push(() => window.removeEventListener('scroll', onScroll));
    updateProgress();

    if (backToTop) {
      const onClick = (): void => window.scrollTo({
        top: 0,
        behavior: this.prefersReducedMotion() ? 'auto' : 'smooth',
      });
      backToTop.addEventListener('click', onClick);
      this.cleanups.push(() => backToTop.removeEventListener('click', onClick));
    }
  }

  private setupSkills(): void {
    const section = document.querySelector<HTMLElement>('#skills');
    const skills = document.querySelectorAll<HTMLElement>('#skills .skill-tag');
    if (!section || skills.length === 0) return;

    if (this.prefersReducedMotion()) {
      skills.forEach((skill) => skill.classList.add('is-landed'));
      return;
    }

    let animationStarted = false;
    const observer = this.makeObserver(() => {
      if (animationStarted) return;
      animationStarted = true;
      skills.forEach((skill, index) => {
        const timeout = window.setTimeout(() => {
          skill.classList.add('is-falling');
          const onAnimationEnd = (): void => {
            skill.classList.remove('is-falling');
            skill.classList.add('is-landed');
          };
          skill.addEventListener('animationend', onAnimationEnd, { once: true });
          this.cleanups.push(() => skill.removeEventListener('animationend', onAnimationEnd));
        }, index * 110);
        this.timeouts.push(timeout);
      });
    }, { threshold: 0.15 });
    observer.observe(section);
  }
}
