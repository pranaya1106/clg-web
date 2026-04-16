    // ── STANDALONE TAB SWITCHER (runs first, always works) ──
    (function () {
      var tabs = document.querySelectorAll('.dept-tab');
      var panels = document.querySelectorAll('.dept-panel');
      if (!tabs.length || !panels.length) return;
      tabs.forEach(function (tab) {
        tab.addEventListener('click', function (e) {
          e.preventDefault();
          var id = tab.getAttribute('data-tab');
          tabs.forEach(function (t) { t.classList.remove('is-active'); });
          panels.forEach(function (p) { p.classList.remove('is-active'); });
          tab.classList.add('is-active');
          var panel = document.getElementById('panel-' + id);
          if (panel) panel.classList.add('is-active');
        });
      });
    })();



    // Syllabus selector
    (function () {
      var programs = {
        btech: {
          1: { 1: ['Matrices and Calculus', 'Advanced Engineering Physics', 'Programming for Problem Solving', 'Basic Electrical Engineering', 'Computer Aided Engineering Drawing', 'Advanced Engineering Physics Lab', 'Programming for Problem Solving Lab', 'Basic Electrical Engineering Lab', 'IOT & IT Workshop'],
               2: ['Ordinary Differential Equations and Vector Calculus', 'Engineering Chemistry', 'Engineering Mechanics', 'Manufacturing Processes', 'English for Skill Enhancement', 'Engineering Chemistry Lab', 'Manufacturing Lab', 'English Language and Communication Skills Lab', 'Engineering Workshop', 'Python Programming Lab'] },
          2: { 3: ['Transforms and Partial Differential Equations', 'Thermodynamics', 'Strength of Materials', 'Material Science and Metallurgy', 'Kinematics of Machinery', 'Thermodynamics Lab', 'Strength of Materials Lab', 'Computational Mathematics Lab', 'Material Testing Lab'],
               4: ['Probability and Statistics', 'Fluid Mechanics and Hydraulic Machines', 'Dynamics of Machinery', 'Metal Cutting and Machine Tools', 'Industrial Engineering', 'Innovation and Entrepreneurship', 'Fluid Mechanics Lab', 'Machine Tools Lab', 'Dynamics Lab', 'Indian Knowledge System'] },
          3: { 5: ['Heat Transfer', 'Design of Machine Elements', 'CAD/CAM', 'Metrology and Surface Engineering', 'Professional Elective-I', 'Heat Transfer Lab', 'CAD/CAM Lab', 'Metrology Lab', 'Field Based Research Project'],
               6: ['IC Engines and Gas Turbines', 'Finite Element Methods', 'Robotics and Automation', 'Professional Elective-II', 'Open Elective-I', 'IC Engines Lab', 'FEM Lab', 'English for Employability Skills Lab', 'Environmental Science'] },
          4: { 7: ['Automobile Engineering', 'Advanced Composite Materials', 'Professional Elective-III', 'Professional Elective-IV', 'Open Elective-II', 'Automobile Lab', 'Summer Internship'],
               8: ['Professional Elective-V', 'Professional Elective-VI', 'Project Work'] }
        },
        mtech: {
          1: {
            1: ['Advanced Thermodynamics', 'Advanced Manufacturing Processes', 'Professional Elective-I', 'Professional Elective-II', 'Advanced Manufacturing Lab', 'Professional Elective-I Lab', 'Research Methodology & IPR', 'Audit Course-I'],
            2: ['Composite Materials & Mechanics', 'Finite Element Methods', 'Professional Elective-III', 'Professional Elective-IV', 'FEM Lab', 'Professional Elective-III Lab', 'Mini Project with Seminar', 'Audit Course-II']
          },
          2: {
            3: ['Professional Elective-V', 'Open Elective', 'Dissertation Phase-I'],
            4: ['Dissertation Phase-II', 'Dissertation Public Viva-Voce']
          }
        }
      };
      var regulations = {
        "r25": { label: "R25", pdf: "syllabus/pdfs/mech-r25-syllabus.pdf", data: programs.btech },
        "r22": { label: "R22", pdf: "syllabus/pdfs/mech-r22-complete.pdf", data: programs.btech },
      };

      var subjectDetails = {
        "Matrices and Calculus": ["Matrices", "Eigen Values and Eigen Vectors", "Single Variable Calculus", "Multivariable Calculus", "Multiple Integrals"],
        "Advanced Engineering Physics": ["Crystallography", "Quantum Mechanics", "Quantum Computing", "Magnetic and Dielectric Materials", "Laser and Fibre Optics"],
        "Programming for Problem Solving": ["Overview of C", "Loops and Arrays", "Functions and Pointers", "Strings and Structures", "File Handling and Sorting"],
        "Basic Electrical Engineering": ["D.C. Circuits", "A.C. Circuits", "Transformers", "Electrical Machines", "Installations"],
        "Engineering Chemistry": ["Water Treatment", "Electrochemistry and Corrosion", "Energy Sources", "Polymers", "Advanced Materials"],
        "Engineering Mechanics": ["Concurrent Forces", "Friction and Equilibrium", "Centroid and Moment of Inertia", "Kinematics of Particles", "Kinetics of Particles"],
        "Manufacturing Processes": ["Casting Processes", "Welding Processes", "Metal Forming", "Machining Fundamentals", "Non-traditional Manufacturing"],
        "Transforms and Partial Differential Equations": ["Fourier Series", "Fourier Transforms", "Z-Transforms", "PDEs", "Applications"],
        "Thermodynamics": ["Basic Concepts and Laws", "First Law Applications", "Second Law and Entropy", "Availability and Irreversibility", "Gas Power Cycles"],
        "Strength of Materials": ["Simple Stresses and Strains", "Shear Force and Bending Moment", "Bending and Shear Stresses", "Deflection of Beams", "Torsion and Columns"],
        "Material Science and Metallurgy": ["Crystal Structure", "Phase Diagrams", "Heat Treatment", "Ferrous Alloys", "Non-ferrous Alloys and Composites"],
        "Kinematics of Machinery": ["Mechanisms and Machines", "Velocity and Acceleration", "Cams", "Gears and Gear Trains", "Gyroscope"],
        "Probability and Statistics": ["Probability", "Distributions", "Sampling", "Hypothesis Testing", "Regression"],
        "Fluid Mechanics and Hydraulic Machines": ["Fluid Properties and Statics", "Fluid Kinematics and Dynamics", "Flow Through Pipes", "Turbines", "Centrifugal and Reciprocating Pumps"],
        "Dynamics of Machinery": ["Static and Dynamic Force Analysis", "Balancing of Rotating Masses", "Balancing of Reciprocating Masses", "Vibrations: Free and Forced", "Governors and Gyroscopes"],
        "Metal Cutting and Machine Tools": ["Metal Cutting Theory", "Cutting Tool Materials", "Lathe and Drilling Machines", "Milling and Grinding", "CNC Machines"],
        "Industrial Engineering": ["Work Study", "Production Planning", "Inventory Control", "Quality Control", "Plant Layout"],
        "Heat Transfer": ["Conduction", "Convection", "Radiation", "Heat Exchangers", "Boiling and Condensation"],
        "Design of Machine Elements": ["Design for Static Loading", "Design for Fatigue Loading", "Shafts and Couplings", "Bearings", "Springs and Gears"],
        "CAD/CAM": ["CAD Fundamentals", "Geometric Modelling", "CAM and CNC Programming", "Group Technology", "FMS and CIM"],
        "Metrology and Surface Engineering": ["Linear and Angular Measurement", "Comparators", "Surface Roughness", "Gear and Thread Measurement", "Machine Tool Testing"],
        "IC Engines and Gas Turbines": ["IC Engine Fundamentals", "Fuel Systems and Combustion", "Engine Testing and Performance", "Gas Turbines", "Jet Propulsion"],
        "Finite Element Methods": ["Introduction to FEM", "One-Dimensional Problems", "Two-Dimensional Problems", "Isoparametric Elements", "Applications"],
        "Robotics and Automation": ["Robot Components", "Robot Kinematics", "Robot Dynamics", "Sensors and Actuators", "Robot Programming"],
        "Automobile Engineering": ["Vehicle Structure and Engines", "Transmission Systems", "Suspension and Braking", "Steering Systems", "Electrical and Electronics"],
        "Advanced Composite Materials": ["Introduction to Composites", "Fibre and Matrix Materials", "Manufacturing of Composites", "Mechanics of Composites", "Testing and Applications"],
        "Innovation and Entrepreneurship": ["Foundations of Innovation", "Problem Identification", "Opportunity Assessment", "Business Models", "Startups and IPR"],
        "Advanced Thermodynamics": ["Advanced Cycles", "Real Gas Behaviour", "Thermodynamic Relations", "Reactive Systems", "Statistical Thermodynamics"],
        "Advanced Manufacturing Processes": ["Advanced Machining", "Micro and Nano Manufacturing", "Additive Manufacturing", "Laser Processing", "Quality in Manufacturing"],
        "Composite Materials and Mechanics": ["Composite Fundamentals", "Lamina Mechanics", "Laminate Theory", "Failure Theories", "Testing and Design"]
      };
      var regPills = document.getElementById('regPills');
      var yearPills = document.getElementById('yearPills');
      var semPillsRow = document.getElementById('semPills');
      var subjectList = document.getElementById('subjectList');
      var fullSyllabusBtn = document.getElementById('fullSyllabusBtn');
      var currentReg = 'r25';
      var selectedYear = null;

      function buildYearPills() {
        var regData = regulations[currentReg].data;
        var years = Object.keys(regData);
        yearPills.innerHTML = '';
        years.forEach(function (y) {
          var p = document.createElement('button');
          p.className = 'pill'; p.setAttribute('data-year', y);
          p.textContent = 'Year ' + y; yearPills.appendChild(p);
        });
        semPillsRow.innerHTML = ''; semPillsRow.style.display = 'none';
        subjectList.classList.remove('is-visible'); subjectList.innerHTML = '';
        if (fullSyllabusBtn) fullSyllabusBtn.style.display = 'none';
        selectedYear = null;
      }
      buildYearPills();

      regPills.addEventListener('click', function (e) {
        var btn = e.target.closest('.pill'); if (!btn) return;
        currentReg = btn.getAttribute('data-reg');
        regPills.querySelectorAll('.pill').forEach(function (p) { p.classList.remove('is-active'); });
        btn.classList.add('is-active'); buildYearPills();
      });

      yearPills.addEventListener('click', function (e) {
        var btn = e.target.closest('.pill'); if (!btn) return;
        var year = parseInt(btn.getAttribute('data-year')); selectedYear = year;
        yearPills.querySelectorAll('.pill').forEach(function (p) { p.classList.remove('is-active'); }); btn.classList.add('is-active');
        var sems = Object.keys(regulations[currentReg].data[year]);
        semPillsRow.innerHTML = '';
        sems.forEach(function (s) {
          var p = document.createElement('button'); p.className = 'pill';
          p.setAttribute('data-sem', s); p.textContent = 'Sem ' + s; semPillsRow.appendChild(p);
        });
        semPillsRow.style.display = 'flex'; subjectList.classList.remove('is-visible'); subjectList.innerHTML = '';
        if (fullSyllabusBtn) fullSyllabusBtn.style.display = 'none';
      });

      semPillsRow.addEventListener('click', function (e) {
        var btn = e.target.closest('.pill'); if (!btn || !selectedYear) return;
        var sem = parseInt(btn.getAttribute('data-sem'));
        semPillsRow.querySelectorAll('.pill').forEach(function (p) { p.classList.remove('is-active'); }); btn.classList.add('is-active');
        var subjects = regulations[currentReg].data[selectedYear][sem]; if (!subjects) return;
        var pdfUrl = regulations[currentReg].pdf;
        var html = '';
        subjects.forEach(function (name, i) {
          var subName = typeof name === 'object' ? name[1] : name;
          var subCode = typeof name === 'object' ? name[0] : '';
          var units = subjectDetails[subName]; var uh = '';
          if (units && units.length) { uh = '<div class="subject-units"><ol>'; units.forEach(function (u) { uh += '<li>' + u + '</li>'; }); uh += '</ol></div>'; }
          var codeHtml = subCode ? '<span class="subject-code">' + subCode + '</span>' : '<span class="subject-num">' + (i+1) + '.</span>';
          html += '<div class="subject-row" onclick="this.classList.toggle(\'is-expanded\')">' + codeHtml + '<span class="subject-name">' + subName + '</span><span class="subject-toggle">&#9654;</span><a href="' + pdfUrl + '" target="_blank" class="subject-pdf" onclick="event.stopPropagation()">PDF</a></div>' + uh;
        });
        subjectList.innerHTML = html; subjectList.classList.remove('is-visible'); void subjectList.offsetWidth; subjectList.classList.add('is-visible');
        if (fullSyllabusBtn) {
          fullSyllabusBtn.innerHTML = '<a href="' + pdfUrl + '" target="_blank" class="full-syllabus-btn">Download Full ' + regulations[currentReg].label + ' Syllabus &rarr;</a>';
          fullSyllabusBtn.style.display = 'block';
        }
      });
    })();

    // Publication filter
    (function(){var f=document.getElementById('pubFilters');var c=document.querySelectorAll('.pub-card');if(!f||!c.length)return;f.addEventListener('click',function(e){var b=e.target.closest('.pub-filter');if(!b)return;var y=b.getAttribute('data-year');f.querySelectorAll('.pub-filter').forEach(function(x){x.classList.remove('is-active')});b.classList.add('is-active');c.forEach(function(card){var m=(y==='all'||card.getAttribute('data-pub-year')===y);if(m){card.classList.remove('is-hidden');card.style.display='flex'}else{card.classList.add('is-hidden');setTimeout(function(){if(card.classList.contains('is-hidden'))card.style.display='none'},350)}});});})();

    // Achievement toggle
    (function(){document.querySelectorAll('[data-achieve]').forEach(function(card){var toggle=card.querySelector('.achieve-toggle');card.addEventListener('click',function(){var expanded=card.classList.toggle('is-expanded');if(toggle)toggle.textContent=expanded?'Read Less':'Read More';});});})();

    // Faculty hover → filter publications
    (function(){var fcards=document.querySelectorAll('.fcard');var pubCards=document.querySelectorAll('.pub-card');fcards.forEach(function(fcard){var author=fcard.getAttribute('data-author');fcard.addEventListener('mouseenter',function(){var hasMatch=false;pubCards.forEach(function(pub){var a=pub.querySelector('.pub-card__authors');if(a&&a.textContent.indexOf(author)!==-1){pub.classList.remove('is-dimmed');hasMatch=true}else{pub.classList.add('is-dimmed')}});if(!hasMatch)pubCards.forEach(function(p){p.classList.remove('is-dimmed')});});fcard.addEventListener('mouseleave',function(){pubCards.forEach(function(pub){pub.classList.remove('is-dimmed')});});});})();
    // Dark sidebar — show items for active tab
    (function () {
      var dsItems = document.querySelectorAll('.ds-item');
      var streak = document.getElementById('navStreak');

      function fireStreak() {
        if (!streak) return;
        streak.classList.remove('is-firing');
        void streak.offsetWidth;
        streak.classList.add('is-firing');
        setTimeout(function () { streak.classList.remove('is-firing'); }, 600);
      }

      function updateSidebar(activeTab) {
        dsItems.forEach(function (item) {
          var show = item.getAttribute('data-ds-tab') === activeTab;
          item.style.display = show ? 'flex' : 'none';
          item.classList.remove('is-active');
        });
        // Activate first visible item
        var first = document.querySelector('.ds-item[data-ds-tab="' + activeTab + '"]');
        if (first) first.classList.add('is-active');
        // Also switch the active tab panel
        document.querySelectorAll('.dept-panel').forEach(function(p){ p.classList.remove('is-active'); });
        document.querySelectorAll('.dept-tab').forEach(function(t){ t.classList.remove('is-active'); });
        var panel = document.getElementById('panel-' + activeTab);
        if (panel) panel.classList.add('is-active');
        var tab = document.querySelector('.dept-tab[data-tab="' + activeTab + '"]');
        if (tab) tab.classList.add('is-active');
      }

      // Hook into tab clicks
      document.querySelectorAll('.dept-tab').forEach(function (tab) {
        tab.addEventListener('click', function (e) {
          e.preventDefault();
          updateSidebar(tab.getAttribute('data-tab'));
          fireStreak();
        });
      });
      });

      // Sidebar item click — mark active + fire streak + scroll to section
      dsItems.forEach(function (item) {
        item.addEventListener('click', function () {
          var tab = item.getAttribute('data-ds-tab');
          var target = item.getAttribute('data-ds-target');
          // Switch to the right tab first
          updateSidebar(tab);
          // Mark this item active
          var siblings = document.querySelectorAll('.ds-item[data-ds-tab="' + tab + '"]');
          siblings.forEach(function (s) { s.classList.remove('is-active'); });
          item.classList.add('is-active');
          fireStreak();
          // Scroll to target after a brief delay to let panel show
          if (target) {
            setTimeout(function () {
              var el = document.getElementById(target);
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 50);
          }
        });
      });

      // Initialize
      updateSidebar('overview');
    })();
