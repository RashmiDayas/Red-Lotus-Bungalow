
        // --- 1. ROOM DATA ---
        const rooms = [
            {
                title: "Garden Suite",
                price: "LKR 15,000",
                longDesc: "Immerse yourself in nature with our Garden Suite. Located on the ground floor, this suite opens directly onto our lush gardens and serene lotus pond. Wake up to the sound of birds and enjoy your morning tea amidst the greenery. The suite features a plush king-sized bed, colonial-style furniture, and a modern en-suite bathroom with a rain shower.",
                features: ["King-Sized Bed", "Direct Garden Access", "Rain Shower", "Tea/Coffee Station", "Complimentary Wi-Fi"],
                gallery: [
                    "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=2670",
                    "https://images.unsplash.com/photo-1616594039964-4083a300f33c?q=80&w=2670",
                    "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=2670"
                ]
            },
            {
                title: "Royal Loft",
                price: "LKR 18,500",
                longDesc: "Experience the charm of a cozy cabin in the sky. The Royal Loft features high timber ceilings, a private balcony offering panoramic views of misty Nuwara Eliya hills, and a working fireplace to keep you warm on chilly nights. It's a perfect romantic hideaway for couples seeking privacy and atmosphere.",
                features: ["Private Balcony", "Working Fireplace", "Panoramic Views", "Wooden Interior", "Premium Toiletries"],
                gallery: [
                    "https://images.unsplash.com/photo-1505693416388-b0346efee539?q=80&w=2670",
                    "https://images.unsplash.com/photo-1512918760383-5658fc14bc63?q=80&w=2670",
                    "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=2670"
                ]
            },
            {
                title: "Grand Villa",
                price: "LKR 25,000",
                longDesc: "The pinnacle of luxury at Red Lotus. The Grand Villa is designed for families or friends traveling together. It includes two spacious master bedrooms, a private living room with antique furnishings, and a dedicated dining area. Guests in Grand Villa enjoy personalized butler service and exclusive access to our upper terrace.",
                features: ["2 Master Bedrooms", "Private Living & Dining", "Personal Butler", "Upper Terrace Access", "Heated Water"],
                gallery: [
                    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2670",
                    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2670",
                    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2500"
                ]
            }
        ];

        const reviews = [
        {name: "Kasun Perera", date: "2 months ago", text: "Absolute paradise. The colonial architecture is stunning, and staff treated us like royalty."},
        {name: "Sarah Jenkins", date: "1 month ago", text: "The perfect mix of luxury and nature. Waking up to the Nuwara Eliya mist is magical."},
        {name: "Dilshan & Ama", date: "3 weeks ago", text: "Best place for a photoshoot and a chill weekend. Every corner is rich and Instagrammable."},
        {name: "Praveen K.", date: "1 week ago", text: "A hidden gem! The fireplace in Royal Loft made our night. The service is impeccable."},
        {name: "Megan Fox", date: "5 days ago", text: "Loved the tea experience. It's quiet, posh, and absolutely delightful."}
    ];
    const fullReviews = [reviews[reviews.length - 1], ...reviews, reviews[0]];


        // --- 2. OPEN ROOM DETAILS FUNCTION ---
        window.openRoomDetails = (roomTitle) => {
            const modal = document.getElementById('roomDetailsModal');
            const form = document.getElementById('detailsBookingForm');
            const roomImg = document.getElementById('modalRoomImage');
            const titleEl = document.getElementById('modalTitle');
            const priceEl = document.getElementById('modalPrice');
            const descEl = document.getElementById('modalDesc');
            const roomTypeInput = document.getElementById('detailsRoomType');
            const featuresList = document.getElementById('modalFeatures');
            const galleryList = document.getElementById('modalGallery');

            // Find room by Title
            const room = rooms.find(r => r.title === roomTitle);
            if (!room) return;

            // 1. RESET & VISIBILITY
            form.reset(); // Clear previous values
            modal.classList.remove('hidden'); 
            modal.classList.add('flex'); // Add flex for centering
            document.body.classList.add('modal-open'); // Lock scroll

            // 2. POPULATE DATA
            titleEl.textContent = room.title;
            priceEl.textContent = room.price;
            descEl.textContent = room.longDesc;
            roomTypeInput.value = room.title; // Set hidden input for form
            
            if (roomImg) roomImg.src = room.gallery[0];

            featuresList.innerHTML = room.features.map(feat => `
                <li class="flex items-start gap-3">
                    <div class="p-2 bg-gold/10 rounded-full text-gold shrink-0">
                        <i data-lucide="check" class="w-4 h-4"></i>
                    </div>
                    <span class="font-medium text-sm text-gray-700">${feat}</span>
                </li>
            `).join('');

            galleryList.innerHTML = room.gallery.map(img => `
                <img src="${img}" class="rounded-lg w-full h-20 object-cover hover:scale-105 transition-transform cursor-pointer shadow-sm" />
            `).join('');
            
            // Re-initialize icons for newly added elements
            lucide.createIcons();
        };

        // --- 3. CLOSE FUNCTION ---
        window.closeDetailsModal = () => {
            const modal = document.getElementById('roomDetailsModal');
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.classList.remove('modal-open');
        };

        // --- 4. FORM HANDLING ---
        document.getElementById('detailsBookingForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = this.querySelector('button[type="submit"]');
            const originalText = document.getElementById('btnText').textContent;
            const room = document.getElementById('detailsRoomType').value;
            
            // Visual feedback
            btn.innerHTML = `<i data-lucide="check" class="w-5 h-5 mr-2"></i> Request Sent!`;
            btn.classList.remove('from-lotusRed', 'to-lotusDark');
            btn.classList.add('bg-green-600');
            lucide.createIcons();

            // Reset after 3 seconds
            setTimeout(() => {
                document.getElementById('btnText').textContent = originalText;
                btn.classList.add('from-lotusRed', 'to-lotusDark');
                btn.classList.remove('bg-green-600');
                btn.innerHTML = `<span id="btnText">${originalText}</span><i data-lucide="check-circle" class="w-5 h-5"></i>`;
                lucide.createIcons();
                closeDetailsModal();
            }, 2000);
        });


        // --- 2. REVIEWS GENERATION (Create DOM Elements) ---
    const slidesContainer = document.getElementById('slidesContainer');
    const dotsContainer = document.getElementById('dotsContainer');
    
    // --- 3. STATE MANAGEMENT ---
    let currentIndex = 1;
    let isTransitioning = false;
    const transitionDuration = 700; // CSS match

    // --- 4. RENDER REVIEWS FUNCTION ---
    const renderReviews = () => {
        // Check for required elements
        if (!slidesContainer || !dotsContainer) {
            console.error("Slider elements not found!");
            return;
        }

        // Clear previous state
        slidesContainer.innerHTML = '';
        dotsContainer.innerHTML = '';

        // Generate Slides and Dots
        fullReviews.forEach((review, index) => {
            const realIndex = index + 1; // Adjust for "infinite loop" logic (0 vs 1)
            
            // 1. Create Slide Element (Using createElement - Safest Method)
            const slide = document.createElement('div');
            slide.className = "w-full flex-shrink-0 p-4";
            
            // Inner HTML Structure (Clean & Explicit)
            slide.innerHTML = `
                <div class="bg-white/5 backdrop-blur-md border border-gold/20 p-10 rounded-none shadow-2xl h-full flex flex-col justify-between hover:bg-white/10 transition-colors">
                    <!-- Text Content -->
                    <div>
                        <p class="text-gray-200 italic mb-8 leading-loose font-kugile font-light text-xl md:text-2xl">"${review.text}"</p>
                        <div class="flex items-center gap-4 pt-6 border-t border-white/10">
                            <div class="w-12 h-12 bg-gradient-to-br from-lotusRed to-black rounded-full flex items-center justify-center font-heading font-bold text-gold border border-gold/30 text-lg">
                                <div class="text-xs text-gray-500 font-body uppercase tracking-widest">Guest</div>
                                <div>${review.name[0]}</div>
                                <div>
                                    <div class="text-xs text-gray-500 font-body uppercase tracking-widest">${review.date}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // 2. Create Dot Element
            const dot = document.createElement('button');
            dot.className = `h-2 rounded-full transition-all duration-300 ${index === realIndex ? 'w-8 bg-gold' : 'w-2 bg-gray-300 hover:bg-gray-400'}`;
            dot.setAttribute('data-index', realIndex); // Store index for logic
            dot.onclick = () => updateSlider(realIndex);

            // Append to DOM
            slidesContainer.appendChild(slide);
            dotsContainer.appendChild(dot);
        });
    };

    // --- 5. UPDATE SLIDER LOGIC (Update Position) ---
    const updateSliderPosition = () => {
        // Update Transform Style directly
        slidesContainer.style.transform = `translateX(-${(currentIndex) * 100}%)`;
    };

    const handleTransitionEnd = () => {if (isTransitioning) {
            isTransitioning = false;
            // Loop Logic for Infinite Scroll
            if (currentIndex >= fullReviews.length) {
                currentIndex = 1; // Loop back to start
            } else if (currentIndex <= 0) {
                currentIndex = fullReviews.length; // Loop forward to end
            }
        }
    };

        // --- 5. NAV SCROLL EFFECT ---
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('nav-scrolled');
            } else {
                navbar.classList.remove('nav-scrolled');
            }
        });

        // Initialize Icons on Load
        lucide.createIcons();
