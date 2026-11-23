/**
 * FlowSync AI - Interactive SaaS Landing Page Scripts
 * Includes: Sticky Navbar, Tab Switcher, Pricing Calculator,
 * Form Validation, Metric Counters, and Live Activity Toasts.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // =========================================================================
  // 1. Sticky Glass Navbar & Scroll-to-Top
  // =========================================================================
  const navbar = document.getElementById('mainNavbar');
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  const handleScroll = () => {
    const scrollPos = window.scrollY;

    // Navbar backdrop darkening
    if (scrollPos > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll to top button visibility
    if (scrollPos > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Smooth scroll with offset for internal anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();

        // Close mobile navbar if open
        const navbarCollapse = document.getElementById('navbarContent');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
          const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
          if (bsCollapse) bsCollapse.hide();
        }

        const navHeight = navbar.offsetHeight || 70;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // =========================================================================
  // 2. Interactive Widget: AI Workflow Preview Tabs
  // =========================================================================
  const previewTabBtns = document.querySelectorAll('.preview-tab-btn');
  const tabPanes = {
    'auto-scheduling': document.getElementById('tab-auto-scheduling'),
    'meeting-notes': document.getElementById('tab-meeting-notes'),
    'sprint-analytics': document.getElementById('tab-sprint-analytics')
  };

  previewTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedTab = btn.getAttribute('data-tab');

      // Update button active state
      previewTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Hide all panes and display selected
      Object.keys(tabPanes).forEach(tabKey => {
        const pane = tabPanes[tabKey];
        if (pane) {
          if (tabKey === selectedTab) {
            pane.classList.remove('d-none');
            pane.classList.add('active');
          } else {
            pane.classList.add('d-none');
            pane.classList.remove('active');
          }
        }
      });
    });
  });

  // Tab 1: Interactive Rebalance Simulator
  const triggerRebalanceBtn = document.getElementById('triggerRebalanceSim');
  const simStatus = document.getElementById('simStatus');
  const alexLoad = document.getElementById('alexLoad');
  const alexBar = document.getElementById('alexBar');
  const mayaLoad = document.getElementById('mayaLoad');
  const mayaBar = document.getElementById('mayaBar');
  const davidLoad = document.getElementById('davidLoad');
  const davidBar = document.getElementById('davidBar');

  let isRebalanced = false;

  if (triggerRebalanceBtn) {
    triggerRebalanceBtn.addEventListener('click', () => {
      triggerRebalanceBtn.disabled = true;
      triggerRebalanceBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-1"></span> Optimizing...';

      setTimeout(() => {
        isRebalanced = !isRebalanced;

        if (isRebalanced) {
          alexLoad.textContent = '54% Load';
          alexLoad.className = 'badge bg-success-subtle text-success';
          alexBar.style.width = '54%';
          alexBar.className = 'progress-bar bg-success';

          mayaLoad.textContent = '74% Load';
          mayaBar.style.width = '74%';

          davidLoad.textContent = '58% Load';
          davidBar.style.width = '58%';

          simStatus.innerHTML = '<span class="text-success fw-semibold"><i class="bi bi-check-circle me-1"></i> Perfect balance achieved! +31% team capacity</span>';
          triggerRebalanceBtn.innerHTML = '<i class="bi bi-arrow-counterclockwise me-1"></i> Reset Simulation';
          triggerRebalanceBtn.className = 'btn btn-sm btn-outline-glass text-white rounded-pill px-3 py-1';

          showToast('⚡ Autonomous Rebalance Complete', 'Alex Chen focus time increased by 3.5 hrs. Blockers eliminated.');
        } else {
          alexLoad.textContent = '72% Load';
          alexLoad.className = 'badge bg-indigo-subtle text-indigo';
          alexBar.style.width = '72%';
          alexBar.className = 'progress-bar bg-indigo-gradient';

          mayaLoad.textContent = '68% Load';
          mayaBar.style.width = '68%';

          davidLoad.textContent = '65% Load';
          davidBar.style.width = '65%';

          simStatus.textContent = 'Sprint velocity optimized (+22%)';
          triggerRebalanceBtn.innerHTML = '<i class="bi bi-arrow-repeat me-1"></i> Simulate Rebalance';
          triggerRebalanceBtn.className = 'btn btn-sm btn-sky-gradient text-dark fw-bold rounded-pill px-3 py-1';
        }

        triggerRebalanceBtn.disabled = false;
      }, 700);
    });
  }

  // Tab 2: Push Tasks to Jira & Slack Simulator
  const syncToJiraBtn = document.getElementById('syncToJiraBtn');
  const jiraSyncStatus = document.getElementById('jiraSyncStatus');

  if (syncToJiraBtn) {
    syncToJiraBtn.addEventListener('click', () => {
      syncToJiraBtn.disabled = true;
      syncToJiraBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Dispatching to Jira & Slack API...';

      setTimeout(() => {
        syncToJiraBtn.innerHTML = '<i class="bi bi-check-all me-1"></i> 3 Tasks Synced Successfully!';
        syncToJiraBtn.className = 'btn btn-success text-white btn-sm px-3 py-2 rounded-pill fw-semibold';

        jiraSyncStatus.textContent = 'Synced & Active in Sprint 48';
        jiraSyncStatus.className = 'badge bg-success-subtle text-success';

        showToast('🚀 Jira & Slack Deep Sync', '3 actionable tickets created with acceptance criteria and posted to #dev-core.');
      }, 900);
    });
  }

  // =========================================================================
  // 3. Interactive Pricing Calculator (Monthly/Yearly & Seats Slider)
  // =========================================================================
  const billingToggle = document.getElementById('billingToggle');
  const monthlyLabel = document.getElementById('monthlyLabel');
  const yearlyLabel = document.getElementById('yearlyLabel');

  const priceStarter = document.getElementById('priceStarter');
  const pricePro = document.getElementById('pricePro');
  const priceEnterprise = document.getElementById('priceEnterprise');

  const billedStarter = document.getElementById('billedStarter');
  const billedPro = document.getElementById('billedPro');
  const billedEnterprise = document.getElementById('billedEnterprise');

  const teamSizeRange = document.getElementById('teamSizeRange');
  const teamSizeDisplay = document.getElementById('teamSizeDisplay');
  const hoursSavedVal = document.getElementById('hoursSavedVal');
  const roiVal = document.getElementById('roiVal');

  // Plan Base Prices
  const pricingData = {
    monthly: {
      starter: 29,
      pro: 79,
      enterprise: 199,
      periodText: 'Billed monthly'
    },
    yearly: {
      starter: 24, // 20% discount approx
      pro: 64,     // 20% discount approx
      enterprise: 159,
      periodText: 'Billed annually (Save 20%)'
    }
  };

  // Number animation helper
  function animateNumber(element, start, end, duration = 300) {
    if (!element) return;
    const startTime = performance.now();
    const isFloat = end % 1 !== 0;

    function step(currentTime) {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const currentVal = start + (end - start) * progress;

      element.textContent = isFloat ? currentVal.toFixed(1) : Math.round(currentVal);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        element.textContent = isFloat ? end.toFixed(1) : end;
      }
    }

    requestAnimationFrame(step);
  }

  // Update Pricing Displays
  function updatePricing() {
    const isYearly = billingToggle ? billingToggle.checked : false;
    const data = isYearly ? pricingData.yearly : pricingData.monthly;

    // Toggle active label styles
    if (monthlyLabel && yearlyLabel) {
      if (isYearly) {
        monthlyLabel.classList.remove('text-white');
        monthlyLabel.classList.add('text-secondary');
        yearlyLabel.classList.remove('text-secondary');
        yearlyLabel.classList.add('text-white');
      } else {
        yearlyLabel.classList.remove('text-white');
        yearlyLabel.classList.add('text-secondary');
        monthlyLabel.classList.remove('text-secondary');
        monthlyLabel.classList.add('text-white');
      }
    }

    // Animate prices
    if (priceStarter) {
      const current = parseInt(priceStarter.textContent, 10) || 0;
      animateNumber(priceStarter, current, data.starter);
      billedStarter.textContent = data.periodText;
    }

    if (pricePro) {
      const current = parseInt(pricePro.textContent, 10) || 0;
      animateNumber(pricePro, current, data.pro);
      billedPro.textContent = data.periodText;
    }

    if (priceEnterprise) {
      const current = parseInt(priceEnterprise.textContent, 10) || 0;
      animateNumber(priceEnterprise, current, data.enterprise);
      billedEnterprise.textContent = data.periodText;
    }

    // Update Slider calculations
    updateSeatCalculations();
  }

  function updateSeatCalculations() {
    if (!teamSizeRange) return;
    const seats = parseInt(teamSizeRange.value, 10) || 15;

    // Update display label
    if (teamSizeDisplay) {
      teamSizeDisplay.textContent = `${seats} Engineers`;
    }

    // Dynamic ROI calculations:
    // Avg 12.4 hrs saved per engineer per month
    const hoursSaved = Math.round(seats * 12.4);
    // Estimated engineering rate: $75/hr average blended rate
    const estimatedSavings = hoursSaved * 75;

    if (hoursSavedVal) {
      hoursSavedVal.textContent = `${hoursSaved.toLocaleString()} hrs/mo`;
    }

    if (roiVal) {
      roiVal.textContent = `$${estimatedSavings.toLocaleString()}/mo`;
    }
  }

  if (billingToggle) {
    billingToggle.addEventListener('change', updatePricing);
  }

  if (teamSizeRange) {
    teamSizeRange.addEventListener('input', updateSeatCalculations);
  }

  // Initialize with monthly values
  updatePricing();

  // =========================================================================
  // 4. Metric Number Counters (Intersection Observer)
  // =========================================================================
  const counters = document.querySelectorAll('.counter');
  let counted = false;

  const countObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !counted) {
        counted = true;
        counters.forEach(counter => {
          const target = parseFloat(counter.getAttribute('data-target'));
          animateNumber(counter, 0, target, 1200);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const metricsSection = document.querySelector('.metrics-section');
  if (metricsSection) {
    countObserver.observe(metricsSection);
  }

  // =========================================================================
  // 5. Lead Capture Modal Logic & Client-Side Validation
  // =========================================================================
  const leadModalElement = document.getElementById('leadCaptureModal');
  let leadModal = null;
  if (leadModalElement && typeof bootstrap !== 'undefined') {
    leadModal = new bootstrap.Modal(leadModalElement);
  }

  const selectedPlanBadge = document.getElementById('selectedPlanBadge');
  const leadForm = document.getElementById('leadCaptureForm');
  const modalFormContainer = document.getElementById('modalFormContainer');
  const modalSuccessContainer = document.getElementById('modalSuccessContainer');

  const fullNameInput = document.getElementById('fullNameInput');
  const workEmailInput = document.getElementById('workEmailInput');
  const companyNameInput = document.getElementById('companyNameInput');
  const teamSizeSelect = document.getElementById('teamSizeSelect');
  const termsAgreeCheck = document.getElementById('termsAgreeCheck');

  const submitBtn = document.getElementById('submitLeadBtn');
  const submitSpinner = document.getElementById('submitSpinner');
  const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;

  const emailHint = document.getElementById('emailHint');
  const successCompanyName = document.getElementById('successCompanyName');
  const successEmailDisplay = document.getElementById('successEmailDisplay');

  // Trigger buttons across landing page
  document.querySelectorAll('.open-trial-modal').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const plan = button.getAttribute('data-plan') || 'Pro';
      const isYearly = billingToggle ? billingToggle.checked : false;

      let planPrice = '$79/mo';
      if (plan === 'Starter') {
        planPrice = isYearly ? '$24/mo (billed annually)' : '$29/mo';
      } else if (plan === 'Pro') {
        planPrice = isYearly ? '$64/mo (billed annually)' : '$79/mo';
      } else if (plan === 'Enterprise') {
        planPrice = isYearly ? '$159/mo (Custom SLA)' : '$199/mo (Custom SLA)';
      }

      if (selectedPlanBadge) {
        selectedPlanBadge.textContent = `${plan} Plan (${planPrice})`;
      }

      // Reset modal view states
      if (modalFormContainer && modalSuccessContainer) {
        modalFormContainer.classList.remove('d-none');
        modalSuccessContainer.classList.add('d-none');
      }

      if (leadModal) {
        leadModal.show();
      }
    });
  });

  // Real-time email validation helper
  const freeEmailDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', 'mail.ru'];

  if (workEmailInput) {
    workEmailInput.addEventListener('input', () => {
      const email = workEmailInput.value.trim().toLowerCase();
      const domain = email.split('@')[1];

      if (domain && freeEmailDomains.includes(domain)) {
        emailHint.innerHTML = '<span class="text-warning"><i class="bi bi-info-circle me-1"></i> Tip: Use your company work email for automatic team SSO linkage.</span>';
      } else {
        emailHint.innerHTML = 'We will send your instant workspace invitation link here.';
      }
      workEmailInput.classList.remove('is-invalid');
    });
  }

  if (fullNameInput) {
    fullNameInput.addEventListener('input', () => {
      fullNameInput.classList.remove('is-invalid');
    });
  }

  // Form submission handling
  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate Name
      if (!fullNameInput.value.trim()) {
        fullNameInput.classList.add('is-invalid');
        isValid = false;
      }

      // Validate Email (RFC compliant regex)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(workEmailInput.value.trim())) {
        workEmailInput.classList.add('is-invalid');
        isValid = false;
      }

      // Validate Terms Checkbox
      if (!termsAgreeCheck.checked) {
        termsAgreeCheck.classList.add('is-invalid');
        isValid = false;
      }

      if (!isValid) return;

      // Submission simulation state
      submitBtn.disabled = true;
      if (submitSpinner) submitSpinner.classList.remove('d-none');
      if (btnText) btnText.textContent = 'Provisioning Workspace...';

      setTimeout(() => {
        const clientName = fullNameInput.value.trim();
        const clientEmail = workEmailInput.value.trim();
        const clientCompany = companyNameInput.value.trim() || 'your engineering team';

        // Update success card
        if (successCompanyName) successCompanyName.textContent = clientCompany;
        if (successEmailDisplay) successEmailDisplay.textContent = clientEmail;

        // Transition views
        modalFormContainer.classList.add('d-none');
        modalSuccessContainer.classList.remove('d-none');

        // Reset submit button state
        submitBtn.disabled = false;
        if (submitSpinner) submitSpinner.classList.add('d-none');
        if (btnText) btnText.textContent = 'Launch Workspace Now';
        leadForm.reset();

        showToast('🎉 Workspace Created!', `Welcome aboard ${clientName}. Provisioned for ${clientCompany}.`);
      }, 1200);
    });
  }

  // =========================================================================
  // 6. Live Activity Toast Rotator (Social Proof)
  // =========================================================================
  const liveToastElement = document.getElementById('liveActivityToast');
  const toastTitle = document.getElementById('toastTitle');
  const toastMessage = document.getElementById('toastMessage');

  let liveToast = null;
  if (liveToastElement && typeof bootstrap !== 'undefined') {
    liveToast = new bootstrap.Toast(liveToastElement, { delay: 6000 });
  }

  function showToast(title, message) {
    if (!liveToastElement || !liveToast) return;
    if (toastTitle) toastTitle.textContent = title;
    if (toastMessage) toastMessage.textContent = message;
    liveToast.show();
  }

  // Periodic social proof events
  const socialEvents = [
    { title: '⚡ Autonomous Triage', msg: 'FlowSync rebalanced 5 PR reviews for Figma design-systems team.' },
    { title: '🚀 Meeting Synchronized', msg: 'Linear squad converted a 35m architecture sync into 6 Jira tickets.' },
    { title: '🛡️ SOC2 Deep Audit', msg: 'Zero data retention confirmed for 42,000 active developer events.' },
    { title: '💡 Focus Block Shielded', msg: 'Preserved 16 hours of uninterrupted deep coding time at Datadog.' }
  ];

  let eventIndex = 0;
  // Trigger initial welcome toast after 3 seconds
  setTimeout(() => {
    showToast(socialEvents[0].title, socialEvents[0].msg);
  }, 3000);

  // Rotate every 18 seconds
  setInterval(() => {
    eventIndex = (eventIndex + 1) % socialEvents.length;
    showToast(socialEvents[eventIndex].title, socialEvents[eventIndex].msg);
  }, 18000);

});
