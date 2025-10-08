// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", () => {
  const scrollProgress = document.createElement("div")
  scrollProgress.className = "scroll-progress"
  document.body.appendChild(scrollProgress)

  window.addEventListener("scroll", () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
    const scrolled = (window.scrollY / windowHeight) * 100
    scrollProgress.style.width = scrolled + "%"
  })

  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active")

      // Animate hamburger
      const spans = hamburger.querySelectorAll("span")
      if (navMenu.classList.contains("active")) {
        spans[0].style.transform = "rotate(45deg) translate(5px, 5px)"
        spans[1].style.opacity = "0"
        spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)"
      } else {
        spans[0].style.transform = "none"
        spans[1].style.opacity = "1"
        spans[2].style.transform = "none"
      }
    })
  }

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu.classList.contains("active")) {
        navMenu.classList.remove("active")
        const spans = hamburger.querySelectorAll("span")
        spans[0].style.transform = "none"
        spans[1].style.opacity = "1"
        spans[2].style.transform = "none"
      }
    })
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Add animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }, index * 100)
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(
    ".highlight-card, .project-card, .info-card, .contact-card, .reflection-card",
  )
  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })

  const heroSection = document.querySelector(".hero-section")
  if (heroSection) {
    window.addEventListener("scroll", () => {
      const scrolled = window.scrollY
      heroSection.style.transform = `translateY(${scrolled * 0.5}px)`
      heroSection.style.opacity = 1 - scrolled / 600
    })
  }

  const heroTitle = document.querySelector(".hero-title")
  if (heroTitle) {
    const text = heroTitle.textContent
    heroTitle.textContent = ""
    heroTitle.style.opacity = "1"

    let i = 0
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i)
        i++
        setTimeout(typeWriter, 50)
      }
    }

    setTimeout(typeWriter, 500)
  }

  const cards = document.querySelectorAll(".highlight-card, .project-card, .info-card, .contact-card")
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) / 20
      const rotateY = (centerX - x) / 20

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = ""
    })
  })
})
