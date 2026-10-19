// Modern Interactive Enhancements & Navigation
document.addEventListener("DOMContentLoaded", () => {
  // Scroll Progress Indicator
  const scrollProgress = document.createElement("div")
  scrollProgress.className = "scroll-progress"
  document.body.appendChild(scrollProgress)

  const updateScrollProgress = () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
    if (windowHeight > 0) {
      const scrolled = (window.scrollY / windowHeight) * 100
      scrollProgress.style.width = scrolled + "%"
    }
  }
  window.addEventListener("scroll", updateScrollProgress)
  updateScrollProgress()

  // Liquid Navbar Scrolled State
  const navbar = document.querySelector(".navbar")
  const handleNavbarScroll = () => {
    if (window.scrollY > 25) {
      navbar?.classList.add("scrolled")
    } else {
      navbar?.classList.remove("scrolled")
    }
  }
  window.addEventListener("scroll", handleNavbarScroll)
  handleNavbarScroll()

  // Mobile Navigation Toggle
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active")

      // Animate hamburger lines
      const spans = hamburger.querySelectorAll("span")
      if (navMenu.classList.contains("active")) {
        spans[0].style.transform = "rotate(45deg) translate(5px, 5px)"
        spans[1].style.opacity = "0"
        spans[2].style.transform = "rotate(-45deg) translate(6px, -5px)"
      } else {
        spans[0].style.transform = "none"
        spans[1].style.opacity = "1"
        spans[2].style.transform = "none"
      }
    })

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!navbar?.contains(e.target) && navMenu.classList.contains("active")) {
        navMenu.classList.remove("active")
        const spans = hamburger.querySelectorAll("span")
        spans[0].style.transform = "none"
        spans[1].style.opacity = "1"
        spans[2].style.transform = "none"
      }
    })

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
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href")
      if (href && href !== "#") {
        e.preventDefault()
        const target = document.querySelector(href)
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      }
    })
  })

  // Intersection Observer for Elements Animation
  const observerOptions = {
    threshold: 0.08,
    rootMargin: "0px 0px -40px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1"
          entry.target.style.transform = ""
        }, index * 60)
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  const animatedElements = document.querySelectorAll(
    ".highlight-card, .home-card, .metric-pill-box, .project-card, .info-card, .contact-card, .reflection-card, .summary-item",
  )
  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
    observer.observe(el)
  })

  // Subtle Parallax on Hero Section
  const heroSection = document.querySelector(".hero-section")
  if (heroSection) {
    window.addEventListener("scroll", () => {
      const scrolled = window.scrollY
      if (scrolled < 700) {
        heroSection.style.transform = `translateY(${scrolled * 0.1}px)`
        heroSection.style.opacity = Math.max(0, 1 - scrolled / 850)
      }
    })
  }

  // Category Filter Tabs for projects.html
  const filterBtns = document.querySelectorAll(".filter-btn")
  const projectCards = document.querySelectorAll(".project-card[data-category]")

  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("active"))
        btn.classList.add("active")
        const filter = btn.getAttribute("data-filter")

        projectCards.forEach((card) => {
          const category = card.getAttribute("data-category")
          if (filter === "all" || category === filter) {
            card.style.display = ""
            requestAnimationFrame(() => {
              card.style.opacity = "1"
              card.style.transform = "translateY(0) scale(1)"
            })
          } else {
            card.style.opacity = "0"
            card.style.transform = "translateY(12px) scale(0.98)"
            setTimeout(() => {
              const currentActive = document.querySelector(".filter-btn.active")?.getAttribute("data-filter")
              if (currentActive !== "all" && card.getAttribute("data-category") !== currentActive) {
                card.style.display = "none"
              }
            }, 250)
          }
        })
      })
    })
  }

  // 3D Holographic Card Interactive Tilt & Glare (about.html)
  const holoContainer = document.getElementById("holoBadgeContainer")
  const holoCard = document.getElementById("holoBadge")

  if (holoContainer && holoCard) {
    let bounds
    const updateBounds = () => {
      bounds = holoCard.getBoundingClientRect()
    }

    holoContainer.addEventListener("mouseenter", () => {
      updateBounds()
      holoCard.style.transition = "transform 0.08s ease-out, box-shadow 0.25s ease"
    })

    window.addEventListener("resize", updateBounds)

    holoContainer.addEventListener("mousemove", (e) => {
      if (!bounds) updateBounds()
      const mouseX = e.clientX - bounds.left
      const mouseY = e.clientY - bounds.top
      const centerX = bounds.width / 2
      const centerY = bounds.height / 2

      // Calculate tilt angles (max ~13 degrees)
      const rotateX = -((mouseY - centerY) / centerY) * 13
      const rotateY = ((mouseX - centerX) / centerX) * 13

      holoCard.style.transform = `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`
      holoCard.style.setProperty("--glare-x", `${mouseX}px`)
      holoCard.style.setProperty("--glare-y", `${mouseY}px`)

      const lanyardRig = holoContainer.querySelector(".lanyard-rig")
      if (lanyardRig) {
        lanyardRig.style.transform = `translateZ(35px) rotateZ(${(-rotateY * 0.35).toFixed(2)}deg)`
      }
    })

    holoContainer.addEventListener("mouseleave", () => {
      holoCard.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease"
      holoCard.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
      holoCard.style.setProperty("--glare-x", "50%")
      holoCard.style.setProperty("--glare-y", "30%")

      const lanyardRig = holoContainer.querySelector(".lanyard-rig")
      if (lanyardRig) {
        lanyardRig.style.transform = "translateZ(35px) rotateZ(0deg)"
      }
    })
  }

  // 3D Glass Specimen Photo Cards Interactive Tilt (about.html)
  const specimenCards = document.querySelectorAll(".glass-specimen-card")
  specimenCards.forEach((card) => {
    let cardBounds
    card.addEventListener("mouseenter", () => {
      cardBounds = card.getBoundingClientRect()
      card.style.transition = "transform 0.1s ease-out, box-shadow 0.25s ease, border-color 0.25s ease"
    })

    card.addEventListener("mousemove", (e) => {
      if (!cardBounds) cardBounds = card.getBoundingClientRect()
      const x = e.clientX - cardBounds.left
      const y = e.clientY - cardBounds.top
      const centerX = cardBounds.width / 2
      const centerY = cardBounds.height / 2
      const tiltX = -((y - centerY) / centerY) * 8
      const tiltY = ((x - centerX) / centerX) * 8

      card.style.transform = `perspective(900px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateY(-8px) scale3d(1.025, 1.025, 1.025)`
    })

    card.addEventListener("mouseleave", () => {
      card.style.transition = "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease"
      card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0) scale3d(1, 1, 1)"
      cardBounds = null
    })
  })

  // 3D Interactive Hero Glass Deck & Suspended Satellite Chips (index.html)
  const homeHeroStage = document.getElementById("homeHeroStage")
  const homeGlassDeck = document.getElementById("homeGlassDeck")
  const chipTop = document.getElementById("chipTop")
  const chipBottom = document.getElementById("chipBottom")

  if (homeHeroStage && homeGlassDeck) {
    let stageBounds

    const updateStageBounds = () => {
      stageBounds = homeHeroStage.getBoundingClientRect()
    }

    homeHeroStage.addEventListener("mouseenter", () => {
      updateStageBounds()
      homeGlassDeck.style.transition = "transform 0.08s ease-out, box-shadow 0.25s ease"
      if (chipTop) chipTop.style.transition = "transform 0.08s ease-out"
      if (chipBottom) chipBottom.style.transition = "transform 0.08s ease-out"
    })

    window.addEventListener("resize", updateStageBounds)

    homeHeroStage.addEventListener("mousemove", (e) => {
      if (!stageBounds) updateStageBounds()
      const mouseX = e.clientX - stageBounds.left
      const mouseY = e.clientY - stageBounds.top
      const centerX = stageBounds.width / 2
      const centerY = stageBounds.height / 2

      // Calculate tilt angles (max ~12 degrees)
      const rotateX = -((mouseY - centerY) / centerY) * 12
      const rotateY = ((mouseX - centerX) / centerX) * 12

      homeGlassDeck.style.transform = `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`
      homeGlassDeck.style.setProperty("--deck-glare-x", `${mouseX}px`)
      homeGlassDeck.style.setProperty("--deck-glare-y", `${mouseY}px`)

      // Parallax translation for suspended satellite chips on Z-axis
      if (chipTop) {
        chipTop.style.transform = `translateZ(55px) translateX(${(rotateY * 0.9).toFixed(1)}px) translateY(${(-rotateX * 0.9).toFixed(1)}px)`
      }
      if (chipBottom) {
        chipBottom.style.transform = `translateZ(65px) translateX(${(-rotateY * 0.9).toFixed(1)}px) translateY(${(rotateX * 0.9).toFixed(1)}px)`
      }
    })

    homeHeroStage.addEventListener("mouseleave", () => {
      homeGlassDeck.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease"
      homeGlassDeck.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
      homeGlassDeck.style.setProperty("--deck-glare-x", "50%")
      homeGlassDeck.style.setProperty("--deck-glare-y", "30%")

      if (chipTop) {
        chipTop.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
        chipTop.style.transform = "translateZ(55px)"
      }
      if (chipBottom) {
        chipBottom.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
        chipBottom.style.transform = "translateZ(65px)"
      }
      stageBounds = null
    })
  }

  // 3D Tilt for Home Bento Cards
  const homeCards = document.querySelectorAll(".home-card:not(.featured-flagship)")
  homeCards.forEach((card) => {
    let cardBounds
    card.addEventListener("mouseenter", () => {
      cardBounds = card.getBoundingClientRect()
      card.style.transition = "transform 0.1s ease-out, box-shadow 0.25s ease, border-color 0.25s ease"
    })

    card.addEventListener("mousemove", (e) => {
      if (!cardBounds) cardBounds = card.getBoundingClientRect()
      const x = e.clientX - cardBounds.left
      const y = e.clientY - cardBounds.top
      const centerX = cardBounds.width / 2
      const centerY = cardBounds.height / 2
      const tiltX = -((y - centerY) / centerY) * 6
      const tiltY = ((x - centerX) / centerX) * 6

      card.style.transform = `perspective(800px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateY(-6px)`
    })

    card.addEventListener("mouseleave", () => {
      card.style.transition = "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease"
      card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)"
      cardBounds = null
    })
  })

  // 3D Tilt & Specular Glare Tracking for Tech Tiles (about.html)
  const techTiles = document.querySelectorAll(".tech-tile-3d")
  techTiles.forEach((tile) => {
    let bounds
    tile.addEventListener("mouseenter", () => {
      bounds = tile.getBoundingClientRect()
      tile.style.transition = "transform 0.08s ease-out, box-shadow 0.25s ease, border-color 0.25s ease"
    })

    tile.addEventListener("mousemove", (e) => {
      if (!bounds) bounds = tile.getBoundingClientRect()
      const x = e.clientX - bounds.left
      const y = e.clientY - bounds.top
      const centerX = bounds.width / 2
      const centerY = bounds.height / 2

      // Dynamic tilt angles (up to ~12 deg)
      const tiltX = -((y - centerY) / centerY) * 12
      const tiltY = ((x - centerX) / centerX) * 12

      tile.style.transform = `perspective(600px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateZ(8px) scale3d(1.04, 1.04, 1.04)`
      tile.style.setProperty("--tile-glare-x", `${x}px`)
      tile.style.setProperty("--tile-glare-y", `${y}px`)
    })

    tile.addEventListener("mouseleave", () => {
      tile.style.transition = "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease"
      tile.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg) translateZ(0) scale3d(1, 1, 1)"
      bounds = null
    })
  })

  // Contact Direct Copy Buttons
  const copyButtons = document.querySelectorAll(".btn-copy-direct")
  copyButtons.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.preventDefault()
      e.stopPropagation()
      const textToCopy = btn.getAttribute("data-copy")
      if (textToCopy) {
        try {
          await navigator.clipboard.writeText(textToCopy)
          const originalHTML = btn.innerHTML
          btn.classList.add("copied")
          btn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Copied!`
          setTimeout(() => {
            btn.classList.remove("copied")
            btn.innerHTML = originalHTML
          }, 2000)
        } catch (err) {
          console.error("Clipboard copy failed", err)
        }
      }
    })
  })
})


