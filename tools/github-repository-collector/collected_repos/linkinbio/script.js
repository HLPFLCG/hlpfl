// Link-in-Bio Interactions
document.addEventListener("DOMContentLoaded", function () {
  // Animate elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe link buttons for animation
  document.querySelectorAll(".link-button").forEach((el, index) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
  });

  // Add ripple effect to link buttons
  document.querySelectorAll(".link-button, .social-link").forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
            `;

      this.style.position = "relative";
      this.style.overflow = "hidden";
      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Add CSS for ripple animation
  const style = document.createElement("style");
  style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
  document.head.appendChild(style);

  // Copy link functionality
  document.querySelectorAll(".link-button").forEach((button) => {
    button.addEventListener("contextmenu", function (e) {
      e.preventDefault();
      const url = this.href;

      if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
          showToast("Link copied to clipboard!");
        });
      } else {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        showToast("Link copied to clipboard!");
      }
    });
  });

  // Toast notification system
  function showToast(message) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 12px 24px;
            border-radius: 24px;
            font-size: 14px;
            font-weight: 500;
            z-index: 10000;
            transition: transform 0.3s ease;
        `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.transform = "translateX(-50%) translateY(0)";
    }, 100);

    setTimeout(() => {
      toast.style.transform = "translateX(-50%) translateY(100px)";
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 2000);
  }

  // Add hover sound effect (visual feedback instead of actual sound)
  document.querySelectorAll(".link-button, .social-link").forEach((element) => {
    element.addEventListener("mouseenter", function () {
      this.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
    });
  });

  // Profile image tilt effect
  const profileImage = document.querySelector(".profile-image");
  if (profileImage) {
    profileImage.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    profileImage.addEventListener("mouseleave", function () {
      this.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
    });
  }

  // Social links hover effect
  document.querySelectorAll(".social-link").forEach((link, index) => {
    link.addEventListener("mouseenter", function () {
      this.style.animationDelay = `${index * 0.1}s`;
      this.style.animation = "bounce 0.6s ease";
    });

    link.addEventListener("animationend", function () {
      this.style.animation = "";
    });
  });

  // Add bounce animation
  const bounceStyle = document.createElement("style");
  bounceStyle.textContent = `
        @keyframes bounce {
            0%, 20%, 53%, 80%, 100% {
                transform: translate3d(0, 0, 0);
            }
            40%, 43% {
                transform: translate3d(0, -8px, 0);
            }
            70% {
                transform: translate3d(0, -4px, 0);
            }
            90% {
                transform: translate3d(0, -2px, 0);
            }
        }
    `;
  document.head.appendChild(bounceStyle);

  // Dynamic typing effect for bio
  const bio = document.querySelector(".profile-bio");
  if (bio) {
    const originalText = bio.textContent;
    bio.textContent = "";
    bio.style.borderRight = "2px solid rgba(255, 255, 255, 0.8)";
    bio.style.paddingRight = "4px";

    let index = 0;
    const typeWriter = () => {
      if (index < originalText.length) {
        bio.textContent += originalText.charAt(index);
        index++;
        setTimeout(typeWriter, 30);
      } else {
        bio.style.borderRight = "none";
        bio.style.paddingRight = "0";
      }
    };

    setTimeout(typeWriter, 1000);
  }

  // Stats counter animation
  const stats = document.querySelectorAll(".stat-number");
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          !entry.target.classList.contains("counted")
        ) {
          entry.target.classList.add("counted");
          const finalText = entry.target.textContent;
          const number = parseInt(finalText.replace(/\D/g, ""));
          const suffix = finalText.replace(/[\d]/g, "");
          let current = 0;
          const increment = number / 50;

          const counter = () => {
            current += increment;
            if (current < number) {
              entry.target.textContent = Math.floor(current) + suffix;
              requestAnimationFrame(counter);
            } else {
              entry.target.textContent = finalText;
            }
          };

          counter();
        }
      });
    },
    { threshold: 0.5 },
  );

  stats.forEach((stat) => statsObserver.observe(stat));

  // Add keyboard navigation
  let currentLinkIndex = -1;
  const links = Array.from(document.querySelectorAll(".link-button"));

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown" || e.key === "Tab") {
      e.preventDefault();
      currentLinkIndex = (currentLinkIndex + 1) % links.length;
      links[currentLinkIndex].focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      currentLinkIndex =
        currentLinkIndex <= 0 ? links.length - 1 : currentLinkIndex - 1;
      links[currentLinkIndex].focus();
    } else if (e.key === "Enter" && currentLinkIndex >= 0) {
      links[currentLinkIndex].click();
    }
  });

  // Performance optimization - lazy load images
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
            imageObserver.unobserve(img);
          }
        }
      });
    });

    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img);
    });
  }

  // Add page visibility handling
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      document.title = "👋 HLPFL - Come back soon!";
    } else {
      document.title = "HLPFL - Link in Bio";
    }
  });

  console.log("HLPFL Link-in-Bio initialized successfully 🎵");

  // Register Service Worker for PWA support
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log(
            "Service Worker registered successfully:",
            registration.scope,
          );

          // Check for updates
          registration.addEventListener("updatefound", () => {
            const newWorker = registration.installing;
            newWorker.addEventListener("statechange", () => {
              if (
                newWorker.state === "installed" &&
                navigator.serviceWorker.controller
              ) {
                // New service worker available, show update notification
                showToast("New version available! Refresh to update.");
              }
            });
          });
        })
        .catch((error) => {
          console.log("Service Worker registration failed:", error);
        });
    });
  }

  // Install prompt for PWA
  let deferredPrompt;
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    // Show install button or banner (implement UI for this)
    console.log("PWA install prompt available");
  });
});
