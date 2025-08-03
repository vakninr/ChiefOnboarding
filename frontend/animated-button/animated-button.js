/**
 * Animated Button Web Component
 * A customizable animated button component for ChiefOnboarding
 */
class AnimatedButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  static get observedAttributes() {
    return ['text', 'variant', 'size', 'disabled'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  get text() {
    return this.getAttribute('text') || 'Click me';
  }

  get variant() {
    return this.getAttribute('variant') || 'primary';
  }

  get size() {
    return this.getAttribute('size') || 'medium';
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  render() {
    const style = `
      <style>
        /* Animated Button Component Styles */
        :host {
          display: inline-block;
        }

        .animated-button {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: none;
          border-radius: 6px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-weight: 500;
          text-decoration: none;
          cursor: pointer;
          user-select: none;
          transition: all 0.2s ease-in-out;
          overflow: hidden;
          outline: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .animated-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }

        .animated-button:active {
          transform: translateY(0);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .animated-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        /* Size variants */
        .animated-button--small {
          padding: 8px 16px;
          font-size: 14px;
          min-height: 32px;
        }

        .animated-button--medium {
          padding: 12px 24px;
          font-size: 16px;
          min-height: 40px;
        }

        .animated-button--large {
          padding: 16px 32px;
          font-size: 18px;
          min-height: 48px;
        }

        /* Color variants */
        .animated-button--primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .animated-button--primary:hover {
          background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
        }

        .animated-button--secondary {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          color: white;
        }

        .animated-button--secondary:hover {
          background: linear-gradient(135deg, #ee82f0 0%, #f04259 100%);
        }

        .animated-button--success {
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          color: white;
        }

        .animated-button--success:hover {
          background: linear-gradient(135deg, #3d94fe 0%, #00e0fe 100%);
        }

        .animated-button--outline {
          background: transparent;
          color: #667eea;
          border: 2px solid #667eea;
          box-shadow: none;
        }

        .animated-button--outline:hover {
          background: #667eea;
          color: white;
          box-shadow: 0 4px 8px rgba(102, 126, 234, 0.25);
        }

        /* Button text */
        .animated-button__text {
          position: relative;
          z-index: 2;
          transition: transform 0.2s ease;
        }

        .animated-button:active .animated-button__text {
          transform: scale(0.95);
        }

        /* Ripple effect */
        .animated-button__ripple {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transform: scale(0);
          pointer-events: none;
          z-index: 1;
        }

        .animated-button__ripple--active {
          animation: ripple 0.6s ease-out;
        }

        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }

        /* Focus styles for accessibility */
        .animated-button:focus-visible {
          outline: 2px solid #667eea;
          outline-offset: 2px;
        }

        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .animated-button {
            border: 2px solid currentColor;
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .animated-button,
          .animated-button__text,
          .animated-button__ripple {
            transition: none;
            animation: none;
          }
          
          .animated-button:hover {
            transform: none;
          }
        }
      </style>
    `;

    const button = `
      <button class="animated-button animated-button--${this.variant} animated-button--${this.size}" 
              ${this.disabled ? 'disabled' : ''}>
        <span class="animated-button__text">${this.text}</span>
        <span class="animated-button__ripple"></span>
      </button>
    `;

    this.shadowRoot.innerHTML = style + button;
  }

  setupEventListeners() {
    const button = this.shadowRoot.querySelector('button');
    
    button.addEventListener('click', (e) => {
      if (this.disabled) return;
      
      this.createRippleEffect(e);
      
      // Dispatch custom event
      this.dispatchEvent(new CustomEvent('animated-button-click', {
        detail: { text: this.text, variant: this.variant },
        bubbles: true
      }));
    });
  }

  createRippleEffect(e) {
    const button = e.currentTarget;
    const ripple = button.querySelector('.animated-button__ripple');
    
    // Remove existing ripple animation
    ripple.classList.remove('animated-button__ripple--active');
    
    // Get button dimensions and click position
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    // Set ripple position and size
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    // Trigger animation
    ripple.classList.add('animated-button__ripple--active');
  }
}

// Register the custom element
customElements.define('animated-button', AnimatedButton);

export default AnimatedButton;