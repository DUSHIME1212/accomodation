import { UserIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const apartmentType = defineType({
  name: "apartment",
  title: "Apartment",
  type: "document",
  icon: UserIcon,
  fields: [
    // ============================================
    // BASIC INFORMATION
    // ============================================
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
      description:
        "Display name of the apartment (e.g., 'Deluxe Sea View Suite')",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      description: "URL-friendly version of the name",
    },
    {
      name: "gallery",
      title: "Gallery Images",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
            }),
          ],
        },
      ],
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required().max(500),
      description: "Brief description shown in listings (max 500 characters)",
    },
    {
      name: "fullDescription",
      title: "Full Description",
      type: "array",
      of: [{ type: "block" }],
      description: "Detailed description shown on apartment detail page",
    },
    {
      name: "apartmentType",
      title: "Apartment Type",
      type: "string",
      options: {
        list: [
          { title: "Studio", value: "studio" },
          { title: "Apartment", value: "apartment" },
          { title: "Suite", value: "suite" },
          { title: "Penthouse", value: "penthouse" },
          { title: "Villa", value: "villa" },
          { title: "Hotel Room", value: "hotel-room" },
        ],
      },
      validation: (Rule) => Rule.required(),
    },

    // ============================================
    // CAPACITY & ROOM CONFIGURATION
    // ============================================
    {
      name: "capacity",
      title: "Maximum Capacity",
      type: "number",
      validation: (Rule) => Rule.required().min(1).max(20),
      description: "Maximum number of guests allowed",
    },
    {
      name: "standardOccupancy",
      title: "Standard Occupancy",
      type: "number",
      validation: (Rule) => Rule.required().min(1),
      description: "Standard number of guests (before extra guest fees apply)",
    },
    {
      name: "bedrooms",
      title: "Number of Bedrooms",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
      description: "0 for studio apartments",
    },
    {
      name: "bathrooms",
      title: "Number of Bathrooms",
      type: "number",
      validation: (Rule) => Rule.required().min(1),
      description: "Can use decimals (e.g., 1.5 for one full, one half bath)",
    },
    {
      name: "bedConfiguration",
      title: "Bed Configuration",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "room",
              title: "Room",
              type: "string",
              options: {
                list: [
                  { title: "Master Bedroom", value: "master" },
                  { title: "Bedroom 2", value: "bedroom-2" },
                  { title: "Bedroom 3", value: "bedroom-3" },
                  { title: "Living Room", value: "living-room" },
                  { title: "Studio Area", value: "studio" },
                ],
              },
            },
            {
              name: "bedType",
              title: "Bed Type",
              type: "string",
              options: {
                list: [
                  { title: "King Bed", value: "king" },
                  { title: "Queen Bed", value: "queen" },
                  { title: "Double Bed", value: "double" },
                  { title: "Twin Beds", value: "twin" },
                  { title: "Single Bed", value: "single" },
                  { title: "Sofa Bed", value: "sofa-bed" },
                  { title: "Bunk Bed", value: "bunk-bed" },
                ],
              },
            },
            {
              name: "quantity",
              title: "Quantity",
              type: "number",
              validation: (Rule) => Rule.required().min(1).max(10),
            },
          ],
          preview: {
            select: {
              room: "room",
              bedType: "bedType",
              quantity: "quantity",
            },
            prepare({ room, bedType, quantity }) {
              return {
                title: `${room}: ${quantity} ${bedType}`,
              };
            },
          },
        },
      ],
      description: "Detailed bed configuration for each room",
    },
    {
      name: "size",
      title: "Size (m²)",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
      description: "Total floor area in square meters",
    },

    // ============================================
    // LOCATION & VIEW
    // ============================================
    {
      name: "location",
      title: "Location",
      type: "string",
      options: {
        list: [
          { title: "Beachfront", value: "beachfront" },
          { title: "Second Row", value: "second-row" },
          { title: "Garden View", value: "garden-view" },
          { title: "Pool View", value: "pool-view" },
          { title: "Hotel Building", value: "hotel-building" },
          { title: "Garden Area", value: "garden-area" },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "floor",
      title: "Floor Number",
      type: "number",
      description: "Which floor is this apartment on (0 for ground floor)",
    },
    {
      name: "viewType",
      title: "View Type",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Sea View", value: "sea-view" },
          { title: "Ocean View", value: "ocean-view" },
          { title: "City View", value: "city-view" },
          { title: "Garden View", value: "garden-view" },
          { title: "Pool View", value: "pool-view" },
          { title: "Mountain View", value: "mountain-view" },
          { title: "Street View", value: "street-view" },
          { title: "Partial Sea View", value: "partial-sea-view" },
        ],
      },
      description: "Select all applicable views",
    },
    {
      name: "buildingName",
      title: "Building Name",
      type: "string",
      description: "Name of the building/complex",
    },
    {
      name: "unitNumber",
      title: "Unit Number",
      type: "string",
      description: "Specific unit number (e.g., 'A-101', '5B')",
    },

    // ============================================
    // PRICING
    // ============================================
    {
      name: "basePrice",
      title: "Base Price (per night)",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
      description: "Standard weekday price per night",
    },
    {
      name: "weekendPrice",
      title: "Weekend Price (per night)",
      type: "number",
      description: "Different pricing for Friday-Sunday (optional)",
    },
    {
      name: "currency",
      title: "Currency",
      type: "string",
      options: {
        list: [
          { title: "USD - US Dollar", value: "USD" },
          { title: "EUR - Euro", value: "EUR" },
          { title: "GBP - British Pound", value: "GBP" },
          { title: "RWF - Rwandan Franc", value: "RWF" },
        ],
      },
      initialValue: "USD",
    },
    {
      name: "cleaningFee",
      title: "Cleaning Fee",
      type: "number",
      initialValue: 50,
      description: "One-time cleaning fee per stay",
    },
    {
      name: "serviceFee",
      title: "Service Fee",
      type: "number",
      initialValue: 30,
      description: "Service/booking fee per stay",
    },
    {
      name: "securityDeposit",
      title: "Security Deposit",
      type: "number",
      initialValue: 0,
      description: "Refundable security deposit amount",
    },
    {
      name: "taxRate",
      title: "Tax Rate (%)",
      type: "number",
      initialValue: 10,
      validation: (Rule) => Rule.min(0).max(100),
      description: "Tax percentage (e.g., 10 for 10%)",
    },
    {
      name: "extraGuestFee",
      title: "Extra Guest Fee (per person/night)",
      type: "number",
      initialValue: 0,
      description: "Fee for guests beyond standard occupancy",
    },
    {
      name: "childrenFree",
      title: "Children Stay Free",
      type: "boolean",
      initialValue: true,
      description: "Children under certain age stay free",
    },
    {
      name: "freeChildrenAge",
      title: "Free Children Age Limit",
      type: "number",
      initialValue: 12,
      description: "Maximum age for free child stay (e.g., 12 years)",
    },

    // ============================================
    // SEASONAL & SPECIAL PRICING
    // ============================================
    {
      name: "seasonalPricing",
      title: "Seasonal Pricing",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "seasonName",
              title: "Season Name",
              type: "string",
              options: {
                list: [
                  { title: "High Season", value: "high" },
                  { title: "Low Season", value: "low" },
                  { title: "Peak Season", value: "peak" },
                  { title: "Shoulder Season", value: "shoulder" },
                  { title: "Holiday Season", value: "holiday" },
                ],
              },
            },
            {
              name: "startDate",
              title: "Start Date",
              type: "date",
            },
            {
              name: "endDate",
              title: "End Date",
              type: "date",
            },
            {
              name: "pricePerNight",
              title: "Price per Night",
              type: "number",
              validation: (Rule) => Rule.min(0),
            },
          ],
          preview: {
            select: {
              season: "seasonName",
              start: "startDate",
              end: "endDate",
              price: "pricePerNight",
            },
            prepare({ season, start, end, price }) {
              return {
                title: `${season}: $${price}/night`,
                subtitle: `${start} - ${end}`,
              };
            },
          },
        },
      ],
    },

    // ============================================
    // INVENTORY & AVAILABILITY
    // ============================================
    {
      name: "totalUnits",
      title: "Total Units Available",
      type: "number",
      validation: (Rule) => Rule.required().min(1),
      initialValue: 1,
      description: "How many units of this apartment type exist",
    },
    {
      name: "isActive",
      title: "Active",
      type: "boolean",
      description: "Is this apartment available for booking?",
      initialValue: true,
    },
    {
      name: "availabilityStatus",
      title: "Availability Status",
      type: "string",
      options: {
        list: [
          { title: "Available", value: "available" },
          { title: "Limited Availability", value: "limited" },
          { title: "Fully Booked", value: "booked" },
          { title: "Under Maintenance", value: "maintenance" },
          { title: "Coming Soon", value: "coming-soon" },
        ],
      },
      initialValue: "available",
    },

    // ============================================
    // BOOKING POLICIES
    // ============================================
    {
      name: "minimumStay",
      title: "Minimum Stay (nights)",
      type: "number",
      initialValue: 1,
      validation: (Rule) => Rule.required().min(1),
      description: "Minimum number of nights required",
    },
    {
      name: "maximumStay",
      title: "Maximum Stay (nights)",
      type: "number",
      description: "Maximum stay duration (leave empty for no limit)",
    },
    {
      name: "advanceBookingDays",
      title: "Advance Booking Required (days)",
      type: "number",
      initialValue: 0,
      description: "Minimum days in advance to book (0 for same-day booking)",
    },
    {
      name: "checkInTime",
      title: "Standard Check-in Time",
      type: "string",
      initialValue: "15:00",
      validation: (Rule) =>
        Rule.regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
          name: "time",
          invert: false,
        }).error("Must be in HH:MM format (e.g., 15:00)"),
      description: "Format: HH:MM (24-hour)",
    },
    {
      name: "checkOutTime",
      title: "Standard Check-out Time",
      type: "string",
      initialValue: "11:00",
      validation: (Rule) =>
        Rule.regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
          name: "time",
          invert: false,
        }).error("Must be in HH:MM format (e.g., 11:00)"),
      description: "Format: HH:MM (24-hour)",
    },
    {
      name: "earlyCheckInAvailable",
      title: "Early Check-in Available",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "earlyCheckInFee",
      title: "Early Check-in Fee",
      type: "number",
      description: "Additional fee for early check-in",
    },
    {
      name: "lateCheckOutAvailable",
      title: "Late Check-out Available",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "lateCheckOutFee",
      title: "Late Check-out Fee",
      type: "number",
      description: "Additional fee for late check-out",
    },
    {
      name: "cancellationPolicy",
      title: "Cancellation Policy",
      type: "string",
      options: {
        list: [
          {
            title: "Flexible - Free cancellation 24h before",
            value: "flexible",
          },
          {
            title: "Moderate - Free cancellation 5 days before",
            value: "moderate",
          },
          {
            title: "Strict - Free cancellation 14 days before",
            value: "strict",
          },
          {
            title: "Super Strict - Free cancellation 30 days before",
            value: "super-strict",
          },
          { title: "Non-Refundable", value: "non-refundable" },
        ],
      },
      initialValue: "moderate",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "cancellationPolicyDetails",
      title: "Cancellation Policy Details",
      type: "text",
      rows: 3,
      description: "Detailed explanation of the cancellation policy",
    },

    // ============================================
    // FEATURES & AMENITIES
    // ============================================
    {
      name: "features",
      title: "Features & Amenities",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Wi-Fi", value: "wifi" },
          { title: "Kitchen", value: "kitchen" },
          { title: "Kitchenette", value: "kitchenette" },
          { title: "Full Kitchen", value: "full-kitchen" },
          { title: "Bathroom", value: "bathroom" },
          { title: "Private Bathroom", value: "private-bathroom" },
          { title: "Air Conditioning", value: "air-conditioning" },
          { title: "Heating", value: "heating" },
          { title: "TV", value: "tv" },
          { title: "Smart TV", value: "smart-tv" },
          { title: "Cable TV", value: "cable-tv" },
          { title: "Balcony", value: "balcony" },
          { title: "Terrace", value: "terrace" },
          { title: "Patio", value: "patio" },
          { title: "Washing Machine", value: "washing-machine" },
          { title: "Dryer", value: "dryer" },
          { title: "Dishwasher", value: "dishwasher" },
          { title: "Microwave", value: "microwave" },
          { title: "Coffee Maker", value: "coffee-maker" },
          { title: "Refrigerator", value: "refrigerator" },
          { title: "Freezer", value: "freezer" },
          { title: "Oven", value: "oven" },
          { title: "Stove", value: "stove" },
          { title: "Iron & Ironing Board", value: "iron" },
          { title: "Hair Dryer", value: "hair-dryer" },
          { title: "Safe", value: "safe" },
          { title: "Mini Fridge", value: "mini-fridge" },
          { title: "Mini Bar", value: "mini-bar" },
          { title: "Ocean View", value: "ocean-view" },
          { title: "Sea View", value: "sea-view" },
          { title: "Garden View", value: "garden-view" },
          { title: "Pool View", value: "pool-view" },
          { title: "City View", value: "city-view" },
          { title: "Parking", value: "parking" },
          { title: "Free Parking", value: "free-parking" },
          { title: "Private Parking", value: "private-parking" },
          { title: "Swimming Pool", value: "swimming-pool" },
          { title: "Private Pool", value: "private-pool" },
          { title: "Hot Tub", value: "hot-tub" },
          { title: "Jacuzzi", value: "jacuzzi" },
          { title: "Gym", value: "gym" },
          { title: "Fitness Center", value: "fitness-center" },
          { title: "Spa", value: "spa" },
          { title: "Sauna", value: "sauna" },
          { title: "BBQ Grill", value: "bbq-grill" },
          { title: "Elevator", value: "elevator" },
          { title: "Beach Access", value: "beach-access" },
          { title: "Private Beach", value: "private-beach" },
          { title: "Workspace", value: "workspace" },
          { title: "Dedicated Workspace", value: "dedicated-workspace" },
          { title: "Fireplace", value: "fireplace" },
          { title: "Sound System", value: "sound-system" },
          { title: "Game Console", value: "game-console" },
          { title: "Books & Toys", value: "books-toys" },
        ],
      },
      description: "Select all available features and amenities",
    },

    // ============================================
    // ACCESSIBILITY
    // ============================================
    {
      name: "isAccessible",
      title: "Wheelchair Accessible",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "accessibilityFeatures",
      title: "Accessibility Features",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Wheelchair Accessible", value: "wheelchair-accessible" },
          { title: "Elevator Access", value: "elevator-access" },
          { title: "Step-Free Entry", value: "step-free-entry" },
          { title: "Wide Doorways", value: "wide-doorways" },
          { title: "Grab Bars", value: "grab-bars" },
          { title: "Roll-in Shower", value: "roll-in-shower" },
          { title: "Lowered Fixtures", value: "lowered-fixtures" },
          { title: "Visual Alarms", value: "visual-alarms" },
          { title: "Hearing Accessible", value: "hearing-accessible" },
          { title: "Accessible Parking", value: "accessible-parking" },
          { title: "Pool Lift", value: "pool-lift" },
        ],
      },
    },

    // ============================================
    // PET POLICY
    // ============================================
    {
      name: "petsAllowed",
      title: "Pets Allowed",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "petFee",
      title: "Pet Fee (per pet/night)",
      type: "number",
      description: "Additional fee for pets",
    },
    {
      name: "petDeposit",
      title: "Pet Deposit (refundable)",
      type: "number",
      description: "Refundable deposit for pets",
    },
    {
      name: "petRestrictions",
      title: "Pet Restrictions",
      type: "text",
      rows: 2,
      description: "Size limits, number of pets, breed restrictions, etc.",
      placeholder:
        "e.g., Maximum 2 pets, under 25lbs each. No aggressive breeds.",
    },

    // ============================================
    // SMOKING POLICY
    // ============================================
    {
      name: "smokingAllowed",
      title: "Smoking Allowed",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "smokingAreas",
      title: "Smoking Policy",
      type: "string",
      options: {
        list: [
          { title: "No Smoking Anywhere", value: "no-smoking" },
          { title: "Balcony/Terrace Only", value: "balcony-only" },
          { title: "Designated Outdoor Areas", value: "designated" },
          { title: "Smoking Allowed Throughout", value: "allowed" },
        ],
      },
      initialValue: "no-smoking",
    },

    // ============================================
    // ADDITIONAL SERVICES
    // ============================================
    {
      name: "breakfastIncluded",
      title: "Breakfast Included",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "breakfastPrice",
      title: "Breakfast Price (per person)",
      type: "number",
      description: "If not included, price to add breakfast",
    },
    {
      name: "breakfastType",
      title: "Breakfast Type",
      type: "string",
      options: {
        list: [
          { title: "Continental", value: "continental" },
          { title: "Full Breakfast", value: "full" },
          { title: "Buffet", value: "buffet" },
          { title: "À la carte", value: "a-la-carte" },
        ],
      },
    },
    {
      name: "parkingAvailable",
      title: "Parking Available",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "parkingType",
      title: "Parking Type",
      type: "string",
      options: {
        list: [
          { title: "Free Parking", value: "free" },
          { title: "Paid Parking", value: "paid" },
          { title: "Valet Parking", value: "valet" },
          { title: "Street Parking Only", value: "street" },
          { title: "Garage Parking", value: "garage" },
        ],
      },
    },
    {
      name: "parkingFee",
      title: "Parking Fee (per day)",
      type: "number",
      description: "Daily parking fee (if applicable)",
    },
    {
      name: "evChargingAvailable",
      title: "EV Charging Available",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "evChargingFee",
      title: "EV Charging Fee",
      type: "number",
      description: "Fee for electric vehicle charging (if applicable)",
    },
    {
      name: "airportTransferAvailable",
      title: "Airport Transfer Available",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "airportTransferFee",
      title: "Airport Transfer Fee (one way)",
      type: "number",
      description: "Fee for one-way airport transfer",
    },

    // ============================================
    // HOUSE RULES
    // ============================================
    {
      name: "houseRules",
      title: "House Rules",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "rule",
              type: "string",
              title: "Rule",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "description",
              type: "text",
              title: "Description",
              rows: 2,
            },
          ],
          preview: {
            select: {
              title: "rule",
              subtitle: "description",
            },
          },
        },
      ],
    },
    {
      name: "quietHoursStart",
      title: "Quiet Hours Start",
      type: "string",
      description: "Format: HH:MM (e.g., 22:00)",
      validation: (Rule) =>
        Rule.regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
          name: "time",
        }),
    },
    {
      name: "quietHoursEnd",
      title: "Quiet Hours End",
      type: "string",
      description: "Format: HH:MM (e.g., 08:00)",
      validation: (Rule) =>
        Rule.regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
          name: "time",
        }),
    },
    {
      name: "partiesAllowed",
      title: "Parties/Events Allowed",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "maximumNoiseLevel",
      title: "Maximum Noise Level Policy",
      type: "text",
      rows: 2,
      description: "Details about noise restrictions",
    },

    // ============================================
    // MEDIA & GALLERY
    // ============================================
    {
      name: "images",
      title: "Image Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative Text",
              description: "Important for SEO and accessibility",
            },
            {
              name: "caption",
              type: "string",
              title: "Caption",
            },
            {
              name: "imageType",
              type: "string",
              title: "Image Type",
              options: {
                list: [
                  { title: "Main Photo", value: "main" },
                  { title: "Bedroom", value: "bedroom" },
                  { title: "Bathroom", value: "bathroom" },
                  { title: "Kitchen", value: "kitchen" },
                  { title: "Living Room", value: "living-room" },
                  { title: "Balcony/Terrace", value: "balcony" },
                  { title: "View", value: "view" },
                  { title: "Amenities", value: "amenities" },
                  { title: "Building Exterior", value: "exterior" },
                ],
              },
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
      description: "Upload at least one image",
    },
    {
      name: "virtualTourUrl",
      title: "360° Virtual Tour URL",
      type: "url",
      description: "Link to Matterport, Kuula, or other virtual tour",
    },
    {
      name: "videoUrl",
      title: "Video Tour URL",
      type: "url",
      description: "YouTube, Vimeo, or direct video link",
    },
    {
      name: "floorPlan",
      title: "Floor Plan",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Upload floor plan image",
    },

    // ============================================
    // LOCATION & DISTANCES
    // ============================================
    {
      name: "distanceToBeach",
      title: "Distance to Beach (meters)",
      type: "number",
      description: "Walking distance to nearest beach",
    },
    {
      name: "distanceToAirport",
      title: "Distance to Airport (km)",
      type: "number",
      description: "Distance to nearest airport",
    },
    {
      name: "distanceToCityCenter",
      title: "Distance to City Center (km)",
      type: "number",
      description: "Distance to city center/downtown",
    },
    {
      name: "nearbyAttractions",
      title: "Nearby Attractions",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              type: "string",
              title: "Attraction Name",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "category",
              type: "string",
              title: "Category",
              options: {
                list: [
                  { title: "Restaurant", value: "restaurant" },
                  { title: "Shopping", value: "shopping" },
                  { title: "Beach", value: "beach" },
                  { title: "Park", value: "park" },
                  { title: "Museum", value: "museum" },
                  { title: "Entertainment", value: "entertainment" },
                  { title: "Transport", value: "transport" },
                  { title: "Medical", value: "medical" },
                ],
              },
            },
            {
              name: "distance",
              type: "number",
              title: "Distance (meters)",
            },
            {
              name: "walkingTime",
              type: "number",
              title: "Walking Time (minutes)",
            },
          ],
          preview: {
            select: {
              name: "name",
              category: "category",
              distance: "distance",
            },
            prepare({ name, category, distance }) {
              return {
                title: name,
                subtitle: `${category} - ${distance}m away`,
              };
            },
          },
        },
      ],
    },
    {
      name: "coordinates",
      title: "GPS Coordinates",
      type: "geopoint",
      description: "Exact location for mapping",
    },
    {
      name: "address",
      title: "Full Address",
      type: "object",
      fields: [
        {
          name: "street",
          type: "string",
          title: "Street Address",
        },
        {
          name: "city",
          type: "string",
          title: "City",
        },
        {
          name: "state",
          type: "string",
          title: "State/Province",
        },
        {
          name: "zipCode",
          type: "string",
          title: "Postal/ZIP Code",
        },
        {
          name: "country",
          type: "string",
          title: "Country",
        },
      ],
    },

    // ============================================
    // SEO & MARKETING
    // ============================================
    {
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      description: "SEO title for search engines (50-60 characters)",
      validation: (Rule) => Rule.max(60),
    },
    {
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      description: "SEO description for search engines (150-160 characters)",
      validation: (Rule) => Rule.max(160),
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Luxury", value: "luxury" },
          { title: "Budget-Friendly", value: "budget-friendly" },
          { title: "Family-Friendly", value: "family-friendly" },
          { title: "Romantic", value: "romantic" },
          { title: "Business Travel", value: "business-travel" },
          { title: "Pet-Friendly", value: "pet-friendly" },
          { title: "Beachfront", value: "beachfront" },
          { title: "Honeymoon", value: "honeymoon" },
          { title: "Long Stay", value: "long-stay" },
          { title: "Eco-Friendly", value: "eco-friendly" },
          { title: "Accessible", value: "accessible" },
          { title: "Modern", value: "modern" },
          { title: "Traditional", value: "traditional" },
          { title: "Boutique", value: "boutique" },
        ],
      },
      description: "Tags for filtering and search",
    },
    {
      name: "featured",
      title: "Featured Property",
      type: "boolean",
      initialValue: false,
      description: "Show this apartment in featured listings",
    },
    {
      name: "dealOfTheDay",
      title: "Deal of the Day",
      type: "boolean",
      initialValue: false,
      description: "Mark as special offer",
    },
    {
      name: "popularityScore",
      title: "Popularity Score",
      type: "number",
      description: "Internal ranking score (higher = more popular)",
      validation: (Rule) => Rule.min(0).max(100),
    },

    // ============================================
    // RATINGS & REVIEWS
    // ============================================
    {
      name: "averageRating",
      title: "Average Rating",
      type: "number",
      readOnly: true,
      description: "Calculated from reviews (read-only)",
      validation: (Rule) => Rule.min(0).max(5),
    },
    {
      name: "totalReviews",
      title: "Total Reviews",
      type: "number",
      readOnly: true,
      description: "Total number of reviews (read-only)",
    },

    // ============================================
    // SYSTEM & SYNC
    // ============================================
    {
      name: "sanityId",
      title: "Sanity ID",
      type: "string",
      readOnly: true,
      hidden: true,
    },
    {
      name: "lastSynced",
      title: "Last Synced",
      type: "datetime",
      readOnly: true,
      hidden: true,
    },
    {
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      readOnly: true,
      hidden: true,
    },
    {
      name: "updatedAt",
      title: "Updated At",
      type: "datetime",
      readOnly: true,
      hidden: true,
    },

    // ============================================
    // INTERNAL NOTES
    // ============================================
    {
      name: "internalNotes",
      title: "Internal Notes",
      type: "text",
      rows: 3,
      description: "Private notes for staff (not visible to guests)",
    },
  ],

  // ============================================
  // PREVIEW CONFIGURATION
  // ============================================
  preview: {
    select: {
      title: "name",
      subtitle: "apartmentType",
      media: "images.0",
      price: "basePrice",
      isActive: "isActive",
    },
    prepare({ title, subtitle, media, price, isActive }) {
      return {
        title: title,
        subtitle: `${subtitle} - $${price}/night ${!isActive ? "(Inactive)" : ""}`,
        media: media,
      };
    },
  },

  // ============================================
  // INITIAL VALUES
  // ============================================
  initialValue: {
    isActive: true,
    currency: "USD",
    standardOccupancy: 2,
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    minimumStay: 1,
    checkInTime: "15:00",
    checkOutTime: "11:00",
    cleaningFee: 50,
    serviceFee: 30,
    taxRate: 10,
    totalUnits: 1,
    cancellationPolicy: "moderate",
    childrenFree: true,
    freeChildrenAge: 12,
    petsAllowed: false,
    smokingAllowed: false,
    smokingAreas: "no-smoking",
    breakfastIncluded: false,
    parkingAvailable: false,
    airportTransferAvailable: false,
    earlyCheckInAvailable: false,
    lateCheckOutAvailable: false,
    partiesAllowed: false,
    isAccessible: false,
    featured: false,
    dealOfTheDay: false,
  },
});
