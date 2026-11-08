export interface RichConverterContent {
  slug: string;
  whatIsHeading: string;
  whatIsParagraphs: string[];
  howToHeading: string;
  howToIntro: string;
  formulaBox: string;
  workedExampleTitle: string;
  workedExampleBody: string;
  quickRefValues: number[];
  commonMistakes: {
    title: string;
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedSlugs: [string, string, string, string];
}

export const RICH_CONVERTER_CONTENT: Record<string, RichConverterContent> = {
  'kg-to-pounds': {
    slug: 'kg-to-pounds',
    whatIsHeading: 'What Is Kilograms to Pounds Conversion',
    whatIsParagraphs: [
      'Kilograms to pounds conversion bridges the International System of Units (SI) base unit of mass—the kilogram (kg)—with the avoirdupois pound (lb), the primary unit of everyday weight in the United States and parts of the Commonwealth. While scientific laboratories, international freight manifests, and Olympic powerlifting competitions record mass in kilograms, American airline baggage counters, gym dumbbell racks, and medical clinics typically list weight in pounds.',
      'Under the 1959 International Yard and Pound Agreement signed by six English-speaking nations, one avoirdupois pound was fixed at exactly 0.45359237 kilograms. Taking the reciprocal of that statutory constant yields 2.20462262185 pounds per kilogram. Whether you are checking if a 23 kg suitcase meets a 50 lb airline limit, logging barbell plates in a commercial gym, or reading imported food packaging, translating kilograms into pounds ensures you never misjudge a load.',
    ],
    howToHeading: 'How to Convert Kilograms to Pounds',
    howToIntro:
      'To convert any measurement from kilograms to pounds, multiply the mass in kilograms by the exact conversion factor of 2.20462262. For rapid mental estimates when a calculator is out of reach, you can multiply the kilogram figure by 2 and then add 10 percent of that result.',
    formulaBox: 'pounds (lb) = kilograms (kg) × 2.20462262',
    workedExampleTitle: 'Worked Example: Convert 68 kg to Pounds',
    workedExampleBody:
      'Suppose an athlete weighs 68 kg on a metric digital scale and needs to enter their body weight in pounds on a US tournament registration form. Multiply 68 by 2.20462262: 68 × 2.20462262 = 149.9143 lb. Rounded to two decimal places, 68 kilograms equals 149.91 pounds (just under the 150 lb lightweight cutoff).',
    quickRefValues: [1, 2, 5, 10, 20, 23, 50, 65, 80, 100],
    commonMistakes: [
      {
        title: 'Rounding the multiplier down to 2.0 or 2.2 on heavy loads',
        description:
          'Using 2.2 is fine for a 2 kg bag of flour, but on a 500 kg industrial pallet, using 2.2 instead of 2.20462262 introduces a 2.31 lb discrepancy that can trigger freight overweight fees.',
      },
      {
        title: 'Confusing decimal pounds with pounds and ounces',
        description:
          'A result of 11.5 pounds does not mean 11 pounds 5 ounces. Because there are 16 ounces in a pound, 0.5 lb equals 8 ounces (0.5 × 16 = 8 oz).',
      },
      {
        title: 'Mixing up troy pounds with standard avoirdupois pounds',
        description:
          'Precious metals occasionally reference the historic troy pound (12 troy ounces), whereas everyday body weight, groceries, and shipping always use the 16-ounce avoirdupois pound.',
      },
    ],
    faqs: [
      {
        question: 'How many pounds are in 1 kilogram?',
        answer:
          'There are approximately 2.20462 pounds in 1 kilogram (or 2 pounds and 3.27 ounces).',
      },
      {
        question: 'Does a 23 kg checked bag exceed a 50 lb airline limit?',
        answer:
          'Yes, slightly. 23 kg equals 50.706 pounds, though many international carriers explicitly set their economy allowance at 23 kg (50 lb) depending on ticket class.',
      },
      {
        question: 'How do I convert kg to lbs in my head?',
        answer:
          'Double the kilogram number, then add 10% of that doubled value. For 40 kg: double is 80, plus 8 (10% of 80) gives 88 lbs (exact is 88.18 lbs).',
      },
      {
        question: 'Which is heavier, 1 kg or 2 pounds?',
        answer:
          'One kilogram is heavier. Because 1 kg equals 2.2046 pounds, it weighs about 3.27 ounces more than a 2-pound weight.',
      },
    ],
    relatedSlugs: ['pounds-to-kg', 'kg-to-gram', 'kg-to-ounce', 'gram-to-ounce'],
  },

  'pounds-to-kg': {
    slug: 'pounds-to-kg',
    whatIsHeading: 'What Is Pounds to Kilograms Conversion',
    whatIsParagraphs: [
      'Pounds to kilograms conversion translates imperial and US customary weight measurements (lb) into the metric system’s standard kilogram (kg). In healthcare, pharmacology, and international logistics, dosages and shipping tariffs are almost universally calculated per kilogram of mass, even when a patient or parcel is initially weighed on a pound-calibrated scale.',
      'By international treaty, a single pound is defined as 0.45359237 kilograms—just under half a kilogram. Converting pounds to kilograms is essential when calculating pediatric medication doses (mg/kg), setting up metric olympic bumper plates from a pound-based training program, or preparing customs declarations for overseas freight.',
    ],
    howToHeading: 'How to Convert Pounds to Kilograms',
    howToIntro:
      'To convert weight from pounds to kilograms, multiply your pound value by 0.45359237 (or divide by 2.20462262). Because the 0.45359237 constant is an exact statutory definition, multiplying by it produces zero theoretical formula error.',
    formulaBox: 'kilograms (kg) = pounds (lb) × 0.45359237',
    workedExampleTitle: 'Worked Example: Convert 165 Pounds to Kilograms',
    workedExampleBody:
      'Imagine a hospital patient states their weight as 165 pounds, and the clinician needs their mass in kilograms for an anesthesia chart. Multiply 165 by 0.45359237: 165 × 0.45359237 = 74.84274 kg. Rounded to two decimal places, 165 pounds is 74.84 kilograms.',
    quickRefValues: [1, 5, 10, 25, 45, 50, 100, 150, 180, 200],
    commonMistakes: [
      {
        title: 'Simply dividing pounds in half without adjusting',
        description:
          'Halving a pound value (multiplying by 0.5) overestimates the true kilogram weight by roughly 10%. For example, 200 lb is 90.72 kg, not 100 kg.',
      },
      {
        title: 'Multiplying by 2.2046 instead of dividing',
        description:
          'Because a kilogram is larger than a pound, the resulting number of kilograms must always be smaller than the starting number of pounds.',
      },
      {
        title: 'Entering pounds-and-ounces directly as a decimal',
        description:
          'If a postal scale reads 4 lb 4 oz, convert the 4 ounces to 0.25 lb (4 ÷ 16) so you enter 4.25 lb rather than 4.4 lb.',
      },
    ],
    faqs: [
      {
        question: 'How many kilograms is 1 pound?',
        answer:
          'One pound is exactly 0.45359237 kilograms, or 453.59 grams.',
      },
      {
        question: 'How many kg is a standard 45 lb gym barbell?',
        answer:
          'A 45-pound barbell weighs 20.41 kilograms. Most international weightlifting federations use a 20 kg (44.09 lb) men’s bar.',
      },
      {
        question: 'What is the easiest mental trick to convert lbs to kg?',
        answer:
          'Divide the pound weight by 2, then subtract 10% of that halved number. For 120 lbs: half is 60, minus 6 gives 54 kg (exact is 54.43 kg).',
      },
      {
        question: 'How many kilograms is 100 pounds?',
        answer:
          '100 pounds equals 45.3592 kilograms, commonly rounded to 45.36 kg.',
      },
    ],
    relatedSlugs: ['kg-to-pounds', 'pounds-to-ounce', 'ounce-to-pounds', 'gram-to-kg'],
  },

  'inch-to-cm': {
    slug: 'inch-to-cm',
    whatIsHeading: 'What Is Inches to Centimeters Conversion',
    whatIsParagraphs: [
      'Inches to centimeters conversion transforms lengths measured in imperial inches (in or ″) into metric centimeters (cm). Although consumer electronics displays (laptops, monitors, and televisions), bicycle wheel diameters, and US lumber sizes are marketed in inches worldwide, international e-commerce sizing charts, passport photo rules, and engineering schematics rely on centimeters.',
      'Prior to 1959, the United States, the United Kingdom, and Canada maintained slightly different physical standards for the inch that varied by a few millionths of a meter. Today, the international inch is universally locked at exactly 2.54 centimeters (25.4 millimeters), making every inch-to-centimeter calculation completely exact.',
    ],
    howToHeading: 'How to Convert Inches to Centimeters',
    howToIntro:
      'To convert a measurement in inches to centimeters, multiply the inch value by 2.54. If your tape measure shows a fraction such as 3/4 of an inch, convert the fraction to a decimal first (0.75 in) before multiplying by 2.54.',
    formulaBox: 'centimeters (cm) = inches (in) × 2.54',
    workedExampleTitle: 'Worked Example: Convert a 27-Inch Monitor Diagonal to cm',
    workedExampleBody:
      'A desktop monitor has a diagonal screen measurement of 27 inches. To find the diagonal size in centimeters for a European spec sheet, multiply 27 by 2.54: 27 × 2.54 = 68.58 cm. The screen diagonal is exactly 68.58 centimeters.',
    quickRefValues: [1, 2, 5, 6, 10, 12, 18, 24, 36, 72],
    commonMistakes: [
      {
        title: 'Misreading eighth-inch or sixteenth-inch ruler marks as tenths',
        description:
          'Standard inch rulers divide each inch into 8 or 16 fractions, not 10 tenths. Three ticks past 5 on an 8th-inch scale is 5.375 inches (5 3/8 in), not 5.3 inches.',
      },
      {
        title: 'Confusing diagonal screen inches with cabinet width',
        description:
          'Converting a 55-inch TV to 139.7 cm gives the corner-to-corner diagonal of the glass panel, not the horizontal width of the television stand.',
      },
      {
        title: 'Using 2.5 instead of 2.54 for apparel or cabinetry',
        description:
          'Dropping the .04 seems minor, but over a 60-inch countertop, multiplying by 2.5 instead of 2.54 leaves your cut 2.4 cm (nearly a full inch) too short.',
      },
    ],
    faqs: [
      {
        question: 'How many centimeters are in 1 inch?',
        answer:
          'There are exactly 2.54 centimeters in 1 international inch.',
      },
      {
        question: 'How many cm is 12 inches (1 foot)?',
        answer:
          '12 inches equals exactly 30.48 centimeters (12 × 2.54 = 30.48 cm).',
      },
      {
        question: 'How do I convert fractional inches like 5 1/2 inches to cm?',
        answer:
          'Write 1/2 as 0.5 to get 5.5 inches, then multiply 5.5 × 2.54 to get 13.97 cm.',
      },
      {
        question: 'Is the inch-to-cm factor an approximation?',
        answer:
          'No. By international statute since July 1, 1959, 1 inch is defined as 2.54 cm with zero further decimal places.',
      },
    ],
    relatedSlugs: ['cm-to-inch', 'inch-to-mm', 'inch-to-feet', 'feet-to-cm'],
  },

  'cm-to-inch': {
    slug: 'cm-to-inch',
    whatIsHeading: 'What Is Centimeters to Inches Conversion',
    whatIsParagraphs: [
      'Centimeters to inches conversion takes a metric length in centimeters (cm) and expresses it in imperial inches (in). Shoppers ordering tailored clothing from European or Asian brands, travelers checking carry-on suitcase dimensions (such as 55 × 40 × 20 cm), and woodworkers building from metric furniture plans frequently need to convert centimeters into inches to match an inch-marked tape measure.',
      'Because one inch is defined as 2.54 centimeters, one centimeter equals 1 divided by 2.54, or approximately 0.39370079 inches. Roughly speaking, 2.5 centimeters is just shy of one inch, and 10 centimeters is slightly under 4 inches (3.937 in).',
    ],
    howToHeading: 'How to Convert Centimeters to Inches',
    howToIntro:
      'To convert centimeters into inches, divide your centimeter figure by 2.54 (or multiply it by 0.39370079). Dividing by 2.54 is the cleanest method because 2.54 is a terminating two-decimal constant.',
    formulaBox: 'inches (in) = centimeters (cm) ÷ 2.54',
    workedExampleTitle: 'Worked Example: Convert a 55 cm Carry-On Height to Inches',
    workedExampleBody:
      'An international airline states that cabin bags must not exceed 55 cm in height. To check this against an American 22-inch roller bag, divide 55 by 2.54: 55 ÷ 2.54 = 21.6535 inches. A 55 cm limit equals 21.65 inches.',
    quickRefValues: [1, 5, 10, 15, 20, 30, 50, 75, 100, 180],
    commonMistakes: [
      {
        title: 'Multiplying by 0.4 for large dimensions',
        description:
          'While 0.4 is a handy mental estimate for 0.3937, using 0.4 on a 200 cm wardrobe door adds 1.26 inches of error—enough to prevent the door from fitting its frame.',
      },
      {
        title: 'Confusing decimal inches with feet and inches',
        description:
          'Converting 170 cm gives 66.93 inches. To express that in feet and inches, divide by 12 to get 5 feet with 6.93 inches remaining (5 ft 7 in), not 6.6 feet.',
      },
      {
        title: 'Reading the millimeter scale as centimeters',
        description:
          'Many metric rulers label numbered marks in centimeters while the tiny ticks are millimeters (0.1 cm). Ensure you divide centimeters—not millimeters—by 2.54.',
      },
    ],
    faqs: [
      {
        question: 'How many inches is 1 centimeter?',
        answer:
          'One centimeter equals approximately 0.3937 inches (just under 3/8 of an inch).',
      },
      {
        question: 'How many inches is 30 cm on a school ruler?',
        answer:
          'A standard 30 cm ruler is 11.811 inches long—about 3/16 of an inch shorter than a 12-inch foot ruler.',
      },
      {
        question: 'What is 100 cm in inches?',
        answer:
          '100 centimeters (1 meter) equals 39.3701 inches, or 3 feet 3.37 inches.',
      },
      {
        question: 'How do I convert decimal inches (like 4.5 in) to a tape measure fraction?',
        answer:
          'Multiply the decimal part by 8 (for eighths) or 16 (for sixteenths). For example, 0.5 × 8 = 4/8, or 1/2 inch.',
      },
    ],
    relatedSlugs: ['inch-to-cm', 'cm-to-feet', 'cm-to-meter', 'mm-to-inch'],
  },

  'feet-to-meter': {
    slug: 'feet-to-meter',
    whatIsHeading: 'What Is Feet to Meters Conversion',
    whatIsParagraphs: [
      'Feet to meters conversion translates imperial feet (ft or ′) into meters (m), the foundational unit of length in the metric system. While commercial aviation altitudes, US residential ceiling heights, and marine depth charts are commonly expressed in feet, international civil engineering, track and field athletics, and scientific hydrodynamics operate strictly in meters.',
      'Since 1959, the international foot has been defined as exactly 0.3048 meters (30.48 centimeters). That means three feet (one yard) is 0.9144 meters—slightly shorter than a single meter stick—and 10 feet equals 3.048 meters.',
    ],
    howToHeading: 'How to Convert Feet to Meters',
    howToIntro:
      'To convert any measurement in feet to meters, multiply the number of feet by 0.3048. If your original measurement is written in feet and inches (for example, 6 ft 6 in), first divide the inches by 12 to get decimal feet (6.5 ft), then multiply by 0.3048.',
    formulaBox: 'meters (m) = feet (ft) × 0.3048',
    workedExampleTitle: 'Worked Example: Convert a 30,000-Foot Cruising Altitude to Meters',
    workedExampleBody:
      'A commercial airliner cruises at an altitude of 30,000 feet. To find the altitude in meters, multiply 30,000 by 0.3048: 30,000 × 0.3048 = 9,144 meters. The aircraft is flying at exactly 9,144 meters (9.144 km) above sea level.',
    quickRefValues: [1, 3, 5, 6, 10, 15, 25, 50, 100, 1000],
    commonMistakes: [
      {
        title: 'Entering feet and inches as a base-10 decimal',
        description:
          '5 feet 6 inches is 5.5 feet (because 6 ÷ 12 = 0.5), NOT 5.6 feet. Entering 5.6 ft produces a 3 cm error.',
      },
      {
        title: 'Dividing by 3 for architectural or surveying work',
        description:
          'Dividing feet by 3 gives a rough ballpark, but it understates the true metric length by 1.6%. Over a 200-foot property boundary, dividing by 3 loses nearly a full meter.',
      },
      {
        title: 'Confusing linear feet with square feet',
        description:
          'Linear feet convert to meters by multiplying by 0.3048, whereas square feet (area) must be multiplied by 0.09290304 (0.3048 squared).',
      },
    ],
    faqs: [
      {
        question: 'How many meters is 1 foot?',
        answer:
          'One international foot is exactly 0.3048 meters (or 30.48 centimeters).',
      },
      {
        question: 'How many meters is a 6-foot person?',
        answer:
          'A height of 6 feet equals 1.8288 meters, commonly rounded to 1.83 m (183 cm).',
      },
      {
        question: 'How many feet does it take to make 1 meter?',
        answer:
          'It takes approximately 3.28084 feet (3 feet and 3.37 inches) to equal 1 meter.',
      },
      {
        question: 'Is the US survey foot different from the international foot?',
        answer:
          'The legacy US survey foot (0.30480061 m) was officially retired by NIST on December 31, 2022, in favor of the exact 0.3048 m international foot.',
      },
    ],
    relatedSlugs: ['meter-to-feet', 'feet-to-cm', 'feet-to-inch', 'yard-to-meter'],
  },

  'meter-to-feet': {
    slug: 'meter-to-feet',
    whatIsHeading: 'What Is Meters to Feet Conversion',
    whatIsParagraphs: [
      'Meters to feet conversion converts metric lengths in meters (m) into imperial feet (ft). Architects reviewing European building codes, swimmers comparing a 25-meter or 50-meter Olympic pool against a 25-yard American pool, and hikers reading topographic elevation contours in meters often need an immediate conversion into feet.',
      'Because 1 foot is fixed at 0.3048 meters, 1 meter equals 1 ÷ 0.3048, or 3.280839895 feet. A single meter is roughly 3 feet and 3.37 inches—about the height of a standard residential kitchen countertop.',
    ],
    howToHeading: 'How to Convert Meters to Feet',
    howToIntro:
      'To convert meters to decimal feet, divide the meter measurement by 0.3048 (or multiply by 3.2808399). Note that the result is in decimal feet; if you need feet and inches, multiply the decimal remainder by 12.',
    formulaBox: 'feet (ft) = meters (m) ÷ 0.3048   (or m × 3.2808399)',
    workedExampleTitle: 'Worked Example: Convert a 50-Meter Olympic Pool to Feet',
    workedExampleBody:
      'An Olympic swimming pool measures 50 meters in length. Multiply 50 by 3.2808399 (or divide 50 by 0.3048): 50 ÷ 0.3048 = 164.042 feet. A 50-meter pool is 164.04 feet long.',
    quickRefValues: [1, 2, 3, 5, 10, 15, 25, 50, 100, 500],
    commonMistakes: [
      {
        title: 'Reading the decimal part of feet directly as inches',
        description:
          '1.75 meters equals 5.7415 feet. That .7415 is 74.15% of a foot (0.7415 × 12 = 8.9 inches), so 5.74 ft is 5 feet 9 inches—not 5 feet 7 inches.',
      },
      {
        title: 'Using 3.0 or 3.2 instead of 3.28084',
        description:
          'Truncating the multiplier to 3.2 on a 100-meter building height understates the structure by more than 8 feet—almost an entire story.',
      },
      {
        title: 'Applying the linear factor to square meters',
        description:
          'To convert floor area from square meters (sq m) to square feet (sq ft), multiply by 10.7639, not 3.2808.',
      },
    ],
    faqs: [
      {
        question: 'How many feet are in 1 meter?',
        answer:
          'There are approximately 3.28084 feet in 1 meter (3 feet and 3.37 inches).',
      },
      {
        question: 'How many feet is a 100-meter sprint track?',
        answer:
          'A 100-meter straightaway is 328.084 feet long (about 109.36 yards).',
      },
      {
        question: 'How do I convert 1.8 meters into feet and inches?',
        answer:
          '1.8 × 3.28084 = 5.9055 feet. Keep the 5 feet, and multiply 0.9055 × 12 = 10.87 inches, giving roughly 5 feet 11 inches.',
      },
      {
        question: 'How many feet is a 3-meter diving board?',
        answer:
          'A 3-meter springboard sits 9.8425 feet (9 feet 10.1 inches) above the water surface.',
      },
    ],
    relatedSlugs: ['feet-to-meter', 'meter-to-yard', 'meter-to-cm', 'cm-to-feet'],
  },

  'miles-to-km': {
    slug: 'miles-to-km',
    whatIsHeading: 'What Is Miles to Kilometers Conversion',
    whatIsParagraphs: [
      'Miles to kilometers conversion transforms statute miles (mi)—the road and distance standard used in the United States and the United Kingdom—into metric kilometers (km), used on highway signs and odometers across Europe, Asia, Canada, Australia, and Latin America. Long-distance runners, road-trippers crossing international borders, and fleet managers rely on this conversion daily.',
      'A statute mile equals 5,280 feet or 1,760 yards. Because each yard is defined as 0.9144 meters, one statute mile is fixed at exactly 1,609.344 meters, or 1.609344 kilometers. Consequently, a distance expressed in kilometers is always about 61% larger numerically than the same distance in miles.',
    ],
    howToHeading: 'How to Convert Miles to Kilometers',
    howToIntro:
      'To convert miles into kilometers, multiply the distance in miles by the exact factor 1.609344. For a quick mental road-trip estimate, multiply the miles by 1.6 (or multiply by 8 and divide by 5).',
    formulaBox: 'kilometers (km) = miles (mi) × 1.609344',
    workedExampleTitle: 'Worked Example: Convert a 26.2-Mile Marathon to Kilometers',
    workedExampleBody:
      'The official marathon distance is 26.21875 miles (26 miles 385 yards). Multiplying 26.21875 by 1.609344 gives 42.194988 km—the classic 42.195 km Olympic marathon distance. Even using 26.2 miles: 26.2 × 1.609344 = 42.1648 km.',
    quickRefValues: [1, 3.1, 5, 10, 13.1, 20, 26.2, 50, 60, 100],
    commonMistakes: [
      {
        title: 'Confusing statute land miles with nautical miles',
        description:
          'Road signs and running apps use the statute mile (1.609344 km). Marine and aviation navigation often use the nautical mile, which is longer at exactly 1.852 km.',
      },
      {
        title: 'Dividing by 1.6 instead of multiplying',
        description:
          'Because a kilometer is shorter than a mile, converting miles to kilometers always produces a larger number. 10 miles is 16.09 km, never 6.21 km.',
      },
      {
        title: 'Forgetting fuel-economy inversions (MPG vs km/L)',
        description:
          'Distance converts directly by × 1.609344, but fuel economy also involves volume (gallons vs liters), so you cannot convert MPG to km/L with the distance factor alone.',
      },
    ],
    faqs: [
      {
        question: 'How many kilometers are in 1 mile?',
        answer:
          'There are exactly 1.609344 kilometers (1,609.344 meters) in 1 statute mile.',
      },
      {
        question: 'How many kilometers is a half marathon (13.1 miles)?',
        answer:
          'A 13.1-mile half marathon is approximately 21.08 kilometers (officially 21.0975 km).',
      },
      {
        question: 'Can you use Fibonacci numbers to convert miles to km?',
        answer:
          'Yes! Consecutive Fibonacci numbers (3, 5, 8, 13, 21, 34, 55, 89) closely match the golden ratio (~1.618), which is very close to 1.609: 5 miles ≈ 8 km, 8 miles ≈ 13 km, and 55 miles ≈ 89 km.',
      },
      {
        question: 'How many km is 60 miles?',
        answer:
          '60 miles equals 96.5606 kilometers (which is why 60 mph is roughly 97 km/h).',
      },
    ],
    relatedSlugs: ['km-to-miles', 'miles-to-meter', 'mph-to-kmh', 'km-to-meter'],
  },

  'km-to-miles': {
    slug: 'km-to-miles',
    whatIsHeading: 'What Is Kilometers to Miles Conversion',
    whatIsParagraphs: [
      'Kilometers to miles conversion translates metric distances in kilometers (km) into imperial statute miles (mi). Runners training for a 5K or 10K race on a mile-calibrated GPS watch, drivers renting a car abroad, and geographers comparing highway distances between countries frequently convert kilometers to miles.',
      'One kilometer equals 1,000 meters, while one statute mile equals 1,609.344 meters. Dividing 1,000 by 1,609.344 gives 0.6213711922 miles per kilometer—meaning a kilometer is just over six-tenths of a mile (roughly 3,280.84 feet).',
    ],
    howToHeading: 'How to Convert Kilometers to Miles',
    howToIntro:
      'To convert a distance from kilometers to miles, multiply the kilometer value by 0.62137119 (or divide by 1.609344). For a fast mental approximation, multiply the kilometers by 0.6, or divide by 8 and multiply by 5.',
    formulaBox: 'miles (mi) = kilometers (km) × 0.62137119',
    workedExampleTitle: 'Worked Example: Convert a 10K Road Race (10 km) to Miles',
    workedExampleBody:
      'A runner signs up for a 10-kilometer charity race and wants to know the total mileage. Multiply 10 by 0.62137119: 10 × 0.62137119 = 6.21371 miles. A 10K race covers 6.21 miles (and a 5K race is half of that at 3.11 miles).',
    quickRefValues: [1, 5, 10, 15, 20, 21.1, 42.2, 50, 100, 120],
    commonMistakes: [
      {
        title: 'Rounding 5K and 10K races to exactly 3 and 6 miles for pace math',
        description:
          'Treating a 10K as 6.0 miles instead of 6.2137 miles leaves out 376 yards at the end of the race, skewing per-mile split calculations by over a minute.',
      },
      {
        title: 'Multiplying by 1.609 instead of 0.6214',
        description:
          'Because a mile is longer than a kilometer, the converted mile figure must always be smaller than the original kilometer figure.',
      },
      {
        title: 'Using 0.6 on long highway distances',
        description:
          'On a 1,000 km road trip, multiplying by 0.6 gives 600 miles instead of the true 621.37 miles—leaving you more than 21 miles short of your destination.',
      },
    ],
    faqs: [
      {
        question: 'How many miles is 1 kilometer?',
        answer:
          'One kilometer is approximately 0.621371 miles (about 5/8 of a mile, or 1,093.6 yards).',
      },
      {
        question: 'How many miles is a 5K run?',
        answer:
          '5 kilometers equals 3.1069 miles, universally referred to by runners as 3.1 miles.',
      },
      {
        question: 'How many miles is 100 km?',
        answer:
          '100 kilometers equals 62.1371 miles (which is why a 100 km/h speed limit is about 62 mph).',
      },
      {
        question: 'Which is longer, 10 km or 6 miles?',
        answer:
          '10 kilometers is longer. 10 km equals 6.2137 miles, which is about 0.214 miles (376 yards) past the 6-mile mark.',
      },
    ],
    relatedSlugs: ['miles-to-km', 'km-to-meter', 'kmh-to-mph', 'miles-to-meter'],
  },

  'celsius-to-fahrenheit': {
    slug: 'celsius-to-fahrenheit',
    whatIsHeading: 'What Is Celsius to Fahrenheit Conversion',
    whatIsParagraphs: [
      'Celsius to Fahrenheit conversion translates temperatures from the Celsius scale (°C)—used by meteorological agencies, medical thermometers, and recipes in nearly every country—into the Fahrenheit scale (°F), the everyday standard for weather forecasts, home thermostats, and baking ovens in the United States.',
      'Unlike weight or length units that share a zero point and scale by a single multiplier, Celsius and Fahrenheit have both different degree sizes and different zero points. Water freezes at 0 °C (32 °F) and boils at 100 °C (212 °F) at standard atmospheric pressure. A 100-degree span on the Celsius scale equals a 180-degree span in Fahrenheit, meaning each 1 °C change equals exactly 1.8 °F (9/5 °F).',
    ],
    howToHeading: 'How to Convert Celsius to Fahrenheit',
    howToIntro:
      'Converting Celsius to Fahrenheit is a two-step arithmetic process: first multiply the Celsius temperature by 1.8 (or 9/5), and then add 32 to account for the freezing-point offset.',
    formulaBox: '°F = (°C × 1.8) + 32',
    workedExampleTitle: 'Worked Example: Convert a 180 °C Baking Recipe to °F',
    workedExampleBody:
      'A European pastry recipe instructs you to preheat the oven to 180 °C. First, multiply 180 by 1.8: 180 × 1.8 = 324. Second, add 32: 324 + 32 = 356 °F. Set your American oven to 356 °F (typically rounded to 350 °F on standard oven dials).',
    quickRefValues: [-40, -10, 0, 10, 20, 25, 30, 37, 100, 180],
    commonMistakes: [
      {
        title: 'Adding 32 before multiplying by 1.8',
        description:
          'Order of operations matters: you must multiply °C by 1.8 first and add 32 last. Adding 32 first on 20 °C gives (20 + 32) × 1.8 = 93.6 °F instead of the true 68 °F.',
      },
      {
        title: 'Adding 32 when converting a temperature difference (delta)',
        description:
          'If a room warms up by 5 °C, the temperature change is simply 5 × 1.8 = 9 °F warmer—do not add 32 when converting a temperature interval.',
      },
      {
        title: 'Dropping the negative sign on sub-zero temperatures',
        description:
          'For −10 °C, multiplying −10 × 1.8 gives −18; adding 32 to −18 yields +14 °F (above zero Fahrenheit, but below freezing).',
      },
    ],
    faqs: [
      {
        question: 'What is normal human body temperature (37 °C) in Fahrenheit?',
        answer:
          '37 °C equals exactly 98.6 °F ((37 × 1.8) + 32 = 98.6 °F).',
      },
      {
        question: 'At what temperature are Celsius and Fahrenheit equal?',
        answer:
          'The two scales intersect at −40 degrees: −40 °C is equal to −40 °F.',
      },
      {
        question: 'What is a comfortable room temperature of 20 °C in Fahrenheit?',
        answer:
          '20 °C equals 68 °F, while 22 °C equals 71.6 °F.',
      },
      {
        question: 'How can I estimate Celsius to Fahrenheit in my head?',
        answer:
          'Double the Celsius temperature and add 30. For 20 °C: (20 × 2) + 30 = 70 °F (very close to the exact 68 °F).',
      },
    ],
    relatedSlugs: [
      'fahrenheit-to-celsius',
      'celsius-to-kelvin',
      'kelvin-to-celsius',
      'fahrenheit-to-kelvin',
    ],
  },

  'fahrenheit-to-celsius': {
    slug: 'fahrenheit-to-celsius',
    whatIsHeading: 'What Is Fahrenheit to Celsius Conversion',
    whatIsParagraphs: [
      'Fahrenheit to Celsius conversion transforms temperature readings from the Fahrenheit scale (°F) into the metric Celsius scale (°C), also historically known as centigrade. International visitors checking US weather apps, laboratory technicians recording ambient conditions, and cooks adapting American barbecue or baking temperatures for metric ovens use this conversion constantly.',
      'On Daniel Gabriel Fahrenheit’s scale, pure water freezes at 32 °F and boils at 212 °F under standard sea-level pressure—a separation of 180 degrees. On Anders Celsius’s scale, that same freezing-to-boiling span is divided into 100 degrees (0 °C to 100 °C). Therefore, after subtracting the 32-degree freezing offset, every 9 degrees Fahrenheit corresponds to 5 degrees Celsius.',
    ],
    howToHeading: 'How to Convert Fahrenheit to Celsius',
    howToIntro:
      'To convert Fahrenheit to Celsius accurately, first subtract 32 from the Fahrenheit temperature, and then divide that result by 1.8 (or multiply by 5 and divide by 9).',
    formulaBox: '°C = (°F − 32) ÷ 1.8   [or (°F − 32) × 5/9]',
    workedExampleTitle: 'Worked Example: Convert a 95 °F Summer Day to Celsius',
    workedExampleBody:
      'A weather station reports an afternoon high of 95 °F. First, subtract 32 from 95: 95 − 32 = 63. Next, divide 63 by 1.8 (or multiply 63 × 5 ÷ 9): 63 ÷ 1.8 = 35 °C. A 95 °F day is exactly 35 °C.',
    quickRefValues: [0, 32, 50, 68, 72, 80, 98.6, 100, 212, 350],
    commonMistakes: [
      {
        title: 'Dividing by 1.8 before subtracting 32',
        description:
          'Because of parentheses in (°F − 32) ÷ 1.8, you must subtract 32 first. Dividing 68 °F by 1.8 first and then subtracting 32 gives 5.78 °C instead of the correct 20 °C.',
      },
      {
        title: 'Using 0.5 instead of 5/9 (0.5556) for cooking temperatures',
        description:
          'At room temperature, dividing (68 − 32) by 2 gives 18 °C (close to 20 °C), but at a 400 °F oven temperature, dividing by 2 instead of 1.8 is off by more than 20 °C.',
      },
      {
        title: 'Assuming 0 °F is the freezing point of water',
        description:
          'Water freezes at 32 °F (0 °C). Zero degrees Fahrenheit (0 °F) is actually a bitter sub-freezing −17.78 °C.',
      },
    ],
    faqs: [
      {
        question: 'What is 32 °F in Celsius?',
        answer:
          '32 °F is exactly 0 °C, the freezing point of water.',
      },
      {
        question: 'What is 350 °F in Celsius for an oven?',
        answer:
          '350 °F equals 176.67 °C, which corresponds to the standard 175 °C or 180 °C setting on metric ovens.',
      },
      {
        question: 'What is 100 °F in Celsius?',
        answer:
          '100 °F equals 37.78 °C—a hot summer day or a low-grade human fever.',
      },
      {
        question: 'How do I quickly estimate Fahrenheit to Celsius in my head?',
        answer:
          'Subtract 30 from the Fahrenheit number and divide the result by 2. For 70 °F: (70 − 30) ÷ 2 = 20 °C (exact is 21.11 °C).',
      },
    ],
    relatedSlugs: [
      'celsius-to-fahrenheit',
      'fahrenheit-to-kelvin',
      'celsius-to-kelvin',
      'kelvin-to-celsius',
    ],
  },

  'liter-to-gallon': {
    slug: 'liter-to-gallon',
    whatIsHeading: 'What Is Liters to Gallons Conversion',
    whatIsParagraphs: [
      'Liters to gallons conversion translates metric liquid volume in liters (L) into US liquid gallons (gal). While beverage bottles, European automobile fuel tanks, backpack hydration bladders, and laboratory carboys are rated in liters, American gas stations, aquarium retailers, paint manufacturers, and municipal water utilities measure capacity in US gallons.',
      'Historically, the US liquid gallon traces its roots to the 18th-century English Queen Anne wine gallon, defined as a cylinder holding 231 cubic inches. Because 1 inch is fixed at 2.54 centimeters, 231 cubic inches equals exactly 3,785.411784 cubic centimeters, or 3.785411784 liters. Taking the reciprocal shows that 1 liter equals approximately 0.26417205 US liquid gallons—slightly more than one US quart (0.25 gal).',
    ],
    howToHeading: 'How to Convert Liters to Gallons',
    howToIntro:
      'To convert a volume from liters to US liquid gallons, divide the number of liters by 3.785411784 (or multiply by 0.26417205). For a quick mental estimate at the hardware store or gas pump, divide the liter figure by 3.8.',
    formulaBox: 'US gallons (gal) = liters (L) ÷ 3.785411784   (or L × 0.26417205)',
    workedExampleTitle: 'Worked Example: Convert a 60-Liter Car Fuel Tank to US Gallons',
    workedExampleBody:
      'An imported sedan’s owner manual lists the fuel tank capacity as 60 liters. To find how many US gallons the tank holds at an American gas station, multiply 60 by 0.26417205 (or divide 60 by 3.785411784): 60 ÷ 3.785411784 = 15.8503 gallons. A 60-liter fuel tank holds 15.85 US gallons.',
    quickRefValues: [1, 2, 3, 4, 5, 10, 20, 50, 100, 200],
    commonMistakes: [
      {
        title: 'Confusing the US liquid gallon with the UK Imperial gallon',
        description:
          'A US liquid gallon is 3.7854 liters, whereas the British Imperial gallon is 20% larger at 4.54609 liters. Using the UK factor understates US gallons by a sixth.',
      },
      {
        title: 'Assuming 4 liters equals exactly 1 US gallon',
        description:
          'One US gallon is 3.785 liters, not 4 liters. A 4-liter jug of motor oil actually contains 1.0567 US gallons (about 4.23 US quarts).',
      },
      {
        title: 'Mixing up US dry gallons with US liquid gallons',
        description:
          'Agricultural berries and grains occasionally reference the US dry gallon (4.4049 L), while all liquids, fuels, and tanks use the 3.7854 L liquid gallon.',
      },
    ],
    faqs: [
      {
        question: 'How many US gallons are in 1 liter?',
        answer:
          'One liter equals approximately 0.264172 US liquid gallons (or about 1.057 US liquid quarts).',
      },
      {
        question: 'How many gallons is a standard 2-liter soda bottle?',
        answer:
          'A 2-liter bottle holds 0.5283 US gallons—just over half a gallon.',
      },
      {
        question: 'How many liters does it take to fill a 5-gallon bucket?',
        answer:
          'It takes 18.927 liters to fill a standard 5-gallon utility bucket (5 × 3.7854 = 18.93 L).',
      },
      {
        question: 'Is a liter bigger than a quart?',
        answer:
          'Yes. One liter is about 5.7% larger than one US liquid quart (1 L = 1.0567 qt, or 33.814 US fluid ounces).',
      },
    ],
    relatedSlugs: ['gallon-to-liter', 'liter-to-ml', 'ml-to-liter', 'gallon-to-ml'],
  },

  'gallon-to-liter': {
    slug: 'gallon-to-liter',
    whatIsHeading: 'What Is Gallons to Liters Conversion',
    whatIsParagraphs: [
      'Gallons to liters conversion transforms liquid capacity measured in US gallons (gal) into metric liters (L). Aquarium hobbyists dosing metric water conditioners into a 55-gallon glass tank, homeowners comparing US hot-water heater capacities against metric models, and pilots cross-checking fuel uplift volumes rely on accurate gallon-to-liter math.',
      'By NIST statutory definition, one US liquid gallon occupies exactly 231 cubic inches, which translates to 3.785411784 liters (3,785.41 milliliters). Consequently, converting from US gallons to liters always increases the numerical value by nearly a factor of four.',
    ],
    howToHeading: 'How to Convert Gallons to Liters',
    howToIntro:
      'To convert US liquid gallons into liters, multiply the gallon volume by the exact conversion constant 3.785411784. For everyday kitchen or workshop estimates, multiplying by 3.785 provides four-figure precision.',
    formulaBox: 'liters (L) = US gallons (gal) × 3.785411784',
    workedExampleTitle: 'Worked Example: Convert a 40-Gallon Aquarium to Liters',
    workedExampleBody:
      'A freshwater fishkeeper buys a 40-gallon breeder tank and needs the volume in liters to select a metric canister filter rated in liters per hour. Multiply 40 by 3.785411784: 40 × 3.785411784 = 151.4165 L. The 40-gallon aquarium holds 151.42 liters of water.',
    quickRefValues: [0.5, 1, 2, 5, 10, 15, 20, 40, 55, 100],
    commonMistakes: [
      {
        title: 'Multiplying by 4.546 when converting American containers',
        description:
          'American milk jugs, paint cans, and gas pumps always use the 3.7854 L US gallon, not the 4.5461 L Imperial gallon formerly used in the UK and Canada.',
      },
      {
        title: 'Dividing by 3.785 instead of multiplying',
        description:
          'Because a liter is smaller than a gallon, it takes almost four liters to equal one gallon; your liter result must always be larger than your starting gallon figure.',
      },
      {
        title: 'Rounding the factor to 3.5 for large storage tanks',
        description:
          'Using 3.5 instead of 3.7854 on a 500-gallon cistern underestimates the tank capacity by more than 142 liters.',
      },
    ],
    faqs: [
      {
        question: 'How many liters are in 1 US gallon?',
        answer:
          'There are exactly 3.785411784 liters (about 3.79 L) in 1 US liquid gallon.',
      },
      {
        question: 'How many liters is a half gallon of milk?',
        answer:
          'A half gallon (0.5 gal) equals 1.8927 liters, or 1,892.7 milliliters.',
      },
      {
        question: 'How many 500 mL water bottles equal 1 US gallon?',
        answer:
          'Because 1 US gallon is 3,785.4 mL, it equals approximately 7.57 standard 500 mL (0.5 L) water bottles.',
      },
      {
        question: 'What is 5 gallons in liters?',
        answer:
          'Five US gallons equals 18.9271 liters, which is the standard size of office water-cooler jugs.',
      },
    ],
    relatedSlugs: ['liter-to-gallon', 'gallon-to-ml', 'liter-to-ml', 'ml-to-liter'],
  },

  'gram-to-ounce': {
    slug: 'gram-to-ounce',
    whatIsHeading: 'What Is Grams to Ounces Conversion',
    whatIsParagraphs: [
      'Grams to ounces conversion translates metric mass in grams (g) into avoirdupois ounces (oz), the standard small-weight unit in the US customary and imperial systems. Pastry chefs adapting French patisserie recipes, coffee roasters weighing espresso beans, ultralight backpackers auditing gear lists, and e-commerce sellers printing USPS first-class shipping labels convert grams to ounces daily.',
      'One avoirdupois pound equals 453.59237 grams and is subdivided into 16 ounces. Dividing 453.59237 by 16 fixes one standard ounce at exactly 28.349523125 grams. Therefore, 1 gram is equal to 1 ÷ 28.349523125, or approximately 0.03527396 ounces.',
    ],
    howToHeading: 'How to Convert Grams to Ounces',
    howToIntro:
      'To convert grams into ounces, divide your gram measurement by 28.349523125 (or multiply by 0.03527396). For quick kitchen estimates, dividing the gram weight by 28.35 is accurate to within two hundredths of a percent.',
    formulaBox: 'ounces (oz) = grams (g) ÷ 28.3495231   (or g × 0.03527396)',
    workedExampleTitle: 'Worked Example: Convert 250 Grams of Butter to Ounces',
    workedExampleBody:
      'A European cake recipe calls for 250 grams of unsalted butter, and your American butter sticks are marked in ounces. Divide 250 by 28.3495231: 250 ÷ 28.3495231 = 8.8185 oz. You need 8.82 ounces of butter (just over two 4-ounce sticks).',
    quickRefValues: [1, 5, 10, 25, 28.35, 50, 100, 200, 250, 500],
    commonMistakes: [
      {
        title: 'Confusing weight ounces (oz) with fluid ounces (fl oz)',
        description:
          'Grams measure mass (weight), whereas fluid ounces measure liquid volume. One ounce of weight equals 28.35 g, while 1 US fluid ounce of water weighs about 29.57 g; dense ingredients like honey or flour differ even more.',
      },
      {
        title: 'Using the 28.35 g avoirdupois factor for gold or silver bullion',
        description:
          'Precious metals are traded in troy ounces (1 oz t = 31.1034768 g), which are nearly 10% heavier than the 28.3495 g kitchen and postal ounce.',
      },
      {
        title: 'Using 30 grams per ounce for large recipe batches',
        description:
          'Nutrition labels sometimes round 1 oz to 28 g or 30 g, but using 30 g per ounce across a 1,000 g dough batch introduces nearly a full ounce of scaling error.',
      },
    ],
    faqs: [
      {
        question: 'How many ounces is 100 grams?',
        answer:
          '100 grams equals 3.5274 ounces (about 3 and a half ounces).',
      },
      {
        question: 'How many grams does it take to make 1 ounce?',
        answer:
          'It takes 28.3495 grams (commonly rounded to 28.35 g) to equal 1 standard avoirdupois ounce.',
      },
      {
        question: 'How many ounces is 500 grams?',
        answer:
          '500 grams (half a kilogram) equals 17.637 ounces, or 1 pound and 1.64 ounces.',
      },
      {
        question: 'Is a gram close to the weight of a paperclip?',
        answer:
          'Yes! A standard small metal paperclip or a crisp US dollar bill weighs approximately 1 gram (0.035 oz).',
      },
    ],
    relatedSlugs: ['ounce-to-gram', 'gram-to-kg', 'kg-to-gram', 'ounce-to-pounds'],
  },

  'ounce-to-gram': {
    slug: 'ounce-to-gram',
    whatIsHeading: 'What Is Ounces to Grams Conversion',
    whatIsParagraphs: [
      'Ounces to grams conversion transforms imperial and US customary weight measurements in ounces (oz) into metric grams (g). Home bakers switching from American cup-and-ounce cookbooks to a precision 1-gram digital kitchen scale, nutritionists logging macronutrients, and jewelers or postal clerks weighing small parcels depend on this exact conversion.',
      'Under the international avoirdupois system, 1 ounce is defined as 1/16 of a pound (0.0625 lb). Because 1 pound is fixed at 453.59237 grams, 1 ounce equals exactly 28.349523125 grams. Converting from ounces to grams lets you measure ingredients with nearly 30 times finer resolution on a digital scale.',
    ],
    howToHeading: 'How to Convert Ounces to Grams',
    howToIntro:
      'To convert a weight in ounces to grams, multiply the number of ounces by 28.349523125. For everyday cooking and postal weighing, multiplying by 28.35 gives results accurate to two decimal places.',
    formulaBox: 'grams (g) = ounces (oz) × 28.3495231',
    workedExampleTitle: 'Worked Example: Convert an 8-Ounce Steak to Grams',
    workedExampleBody:
      'A nutrition plan specifies an 8-ounce portion of sirloin steak, and your kitchen scale is set to grams. Multiply 8 by 28.3495231: 8 × 28.3495231 = 226.7962 g. An 8-ounce (half-pound) portion weighs 226.8 grams.',
    quickRefValues: [0.5, 1, 2, 4, 6, 8, 10, 12, 16, 32],
    commonMistakes: [
      {
        title: 'Weighing dry ounces as milliliters on a liquid measuring cup',
        description:
          'An 8 oz markings line on a glass measuring cup measures 8 fluid ounces (237 mL of volume), not 8 avoirdupois ounces of weight (226.8 g). Dry ingredients like shredded cheese or flour must be weighed on a scale.',
      },
      {
        title: 'Using 28.35 g when weighing troy ounces of gold or silver',
        description:
          'A 1 oz American Eagle gold or silver coin weighs 1 troy ounce (31.1035 g), not 1 avoirdupois ounce (28.3495 g).',
      },
      {
        title: 'Forgetting that 16 ounces—not 10 or 12—make a pound',
        description:
          'When converting a reading like 1 lb 4 oz to grams, first convert 1 lb to 16 oz + 4 oz = 20 oz, then multiply 20 × 28.3495 = 566.99 g.',
      },
    ],
    faqs: [
      {
        question: 'How many grams are in 1 ounce?',
        answer:
          'There are 28.349523125 grams (usually rounded to 28.35 grams) in 1 standard ounce.',
      },
      {
        question: 'How many grams is 4 ounces (one stick of US butter)?',
        answer:
          'Four ounces equals 113.398 grams, which is why recipes usually list 1 stick of butter as 113 g.',
      },
      {
        question: 'How many grams is 16 ounces (1 pound)?',
        answer:
          '16 ounces equals 453.5924 grams (just under half a kilogram).',
      },
      {
        question: 'Why do some food packages list 1 oz as 28g?',
        answer:
          'FDA nutrition labeling guidelines permit rounding 28.3495 g to the nearest whole gram (28 g) on serving size declarations for consumer simplicity.',
      },
    ],
    relatedSlugs: ['gram-to-ounce', 'ounce-to-pounds', 'pounds-to-ounce', 'kg-to-ounce'],
  },

  'yard-to-meter': {
    slug: 'yard-to-meter',
    whatIsHeading: 'What Is Yards to Meters Conversion',
    whatIsParagraphs: [
      'Yards to meters conversion translates lengths measured in imperial yards (yd) into metric meters (m). Textile merchants buying fabric by the yard, golfers reading scorecard hole yardages, swimmers comparing a 25-yard American short-course pool to a 25-meter international pool, and landscapers ordering mulch or turf use this conversion regularly.',
      'Under the 1959 International Yard and Pound Agreement, one international yard was defined as exactly 0.9144 meters (91.44 centimeters, or 36 inches). That makes a yard slightly shorter—by 8.56 centimeters, or about 3.37 inches—than a metric meter.',
    ],
    howToHeading: 'How to Convert Yards to Meters',
    howToIntro:
      'To convert any measurement from yards to meters, multiply the number of yards by the exact statutory factor 0.9144. Because 0.9144 is an exact four-decimal definition, your result will have zero formula rounding error.',
    formulaBox: 'meters (m) = yards (yd) × 0.9144',
    workedExampleTitle: 'Worked Example: Convert a 100-Yard Football Field to Meters',
    workedExampleBody:
      'An American football playing field measures 100 yards between goal lines. To find that distance in meters, multiply 100 by 0.9144: 100 × 0.9144 = 91.44 meters. A 100-yard field is 91.44 meters long (excluding the two 10-yard end zones).',
    quickRefValues: [1, 2, 5, 10, 25, 50, 100, 200, 440, 1760],
    commonMistakes: [
      {
        title: 'Treating yards and meters as a 1:1 match over long distances',
        description:
          'While 1 yard (0.9144 m) looks close to 1 meter across a tabletop, equating them on a 400-yard golf par-4 or a 500-yard swim introduces an 8.56% error (34+ meters short).',
      },
      {
        title: 'Using the linear 0.9144 factor for square yards or cubic yards',
        description:
          'For carpet area in square yards, multiply by 0.836127 (0.9144²). For topsoil or concrete in cubic yards, multiply by 0.764555 (0.9144³).',
      },
      {
        title: 'Dividing by 0.9144 instead of multiplying',
        description:
          'Since a meter is longer than a yard, the number of meters must always be smaller than the number of yards you started with.',
      },
    ],
    faqs: [
      {
        question: 'How many meters is 1 yard?',
        answer:
          'One international yard is defined as exactly 0.9144 meters (or 91.44 centimeters).',
      },
      {
        question: 'Which is longer, 100 yards or 100 meters?',
        answer:
          '100 meters is longer. 100 meters equals 109.36 yards, while 100 yards is only 91.44 meters.',
      },
      {
        question: 'How many meters is a 25-yard swimming pool?',
        answer:
          'A 25-yard pool is 22.86 meters long—more than 2 meters shorter per lap than a 25-meter short-course pool.',
      },
      {
        question: 'How many meters is 1,760 yards (1 mile)?',
        answer:
          '1,760 yards equals 1,609.344 meters, which is the exact metric definition of 1 statute mile.',
      },
    ],
    relatedSlugs: ['meter-to-yard', 'yard-to-inch', 'feet-to-meter', 'meter-to-feet'],
  },

  'cm-to-feet': {
    slug: 'cm-to-feet',
    whatIsHeading: 'What Is Centimeters to Feet Conversion',
    whatIsParagraphs: [
      'Centimeters to feet conversion transforms metric lengths and heights measured in centimeters (cm) into imperial feet (ft). Medical records, international passports, athletic scouting profiles, and flat-pack furniture boxes almost universally list height in centimeters (such as 175 cm or 183 cm), whereas everyday conversation in the United States, Canada, and the UK expresses human and room height in feet.',
      'Because 1 inch equals 2.54 centimeters and 1 foot contains 12 inches, a single foot equals 12 × 2.54 = 30.48 centimeters. Dividing any centimeter measurement by 30.48 yields the exact equivalent in decimal feet.',
    ],
    howToHeading: 'How to Convert Centimeters to Feet',
    howToIntro:
      'To convert centimeters into decimal feet, divide the centimeter value by 30.48 (or multiply by 0.0328084). If you want the result in feet and inches, take the whole number as feet and multiply the decimal remainder by 12 to get the remaining inches.',
    formulaBox: 'feet (ft) = centimeters (cm) ÷ 30.48',
    workedExampleTitle: 'Worked Example: Convert 180 cm Height to Feet',
    workedExampleBody:
      'A person’s passport lists their height as 180 cm. Divide 180 by 30.48: 180 ÷ 30.48 = 5.9055 feet. To express 5.9055 feet in feet and inches, keep the 5 feet and multiply the decimal part by 12: 0.9055 × 12 = 10.87 inches. Thus, 180 cm is 5.91 decimal feet, or about 5 feet 11 inches.',
    quickRefValues: [30, 50, 90, 100, 120, 150, 165, 175, 180, 200],
    commonMistakes: [
      {
        title: 'Reading decimal feet as feet and inches (e.g., 5.9 ft as 5 ft 9 in)',
        description:
          'This is the #1 height conversion error! Because there are 12 inches in a foot (not 10), 0.9 feet equals 0.9 × 12 = 10.8 inches. So 180 cm (5.91 ft) is 5 ft 11 in, not 5 ft 9 in.',
      },
      {
        title: 'Dividing by 30 instead of 30.48',
        description:
          'Dividing 180 cm by 30 gives 6.0 feet (a full inch too tall). Always use 30.48 for accurate height and carpentry conversions.',
      },
      {
        title: 'Confusing centimeters with millimeters',
        description:
          'Architectural drawings often list dimensions in millimeters (e.g., 2400 mm ceiling). Divide millimeters by 10 to get centimeters (240 cm) before dividing by 30.48.',
      },
    ],
    faqs: [
      {
        question: 'How many feet is 100 cm?',
        answer:
          '100 centimeters (1 meter) equals 3.2808 feet, or 3 feet and 3.37 inches.',
      },
      {
        question: 'How many cm are in 1 foot?',
        answer:
          'There are exactly 30.48 centimeters in 1 international foot.',
      },
      {
        question: 'What is 170 cm in feet and inches?',
        answer:
          '170 cm ÷ 30.48 = 5.5774 feet, which equals 5 feet and 6.93 inches (about 5 ft 7 in).',
      },
      {
        question: 'What is 160 cm in feet?',
        answer:
          '160 cm equals 5.2493 decimal feet, or 5 feet 3 inches.',
      },
    ],
    relatedSlugs: ['feet-to-cm', 'cm-to-inch', 'inch-to-cm', 'cm-to-meter'],
  },

  'kg-to-gram': {
    slug: 'kg-to-gram',
    whatIsHeading: 'What Is Kilograms to Grams Conversion',
    whatIsParagraphs: [
      'Kilograms to grams conversion scales between the two most widely used mass units in the metric system: the kilogram (kg) and the gram (g). Although the gram is the root unit of the metric naming convention, the kilogram is the official SI base unit of mass, defined by the Planck constant since 2019.',
      'In the metric prefix system, "kilo-" denotes a factor of exactly 1,000 (10³). Bulk commodities, flour sacks, and parcel weights are billed in kilograms, while laboratory balances, baking recipes, coffee scales, and pharmaceutical formulas require measurements in grams. Converting from kilograms to grams is a clean decimal shift with zero rounding ambiguity.',
    ],
    howToHeading: 'How to Convert Kilograms to Grams',
    howToIntro:
      'To convert kilograms to grams, multiply the kilogram value by 1,000. Equivalently, move the decimal point three places to the right.',
    formulaBox: 'grams (g) = kilograms (kg) × 1,000',
    workedExampleTitle: 'Worked Example: Convert 1.75 kg of Flour to Grams',
    workedExampleBody:
      'A commercial bread formula requires 1.75 kilograms of bread flour, and your digital bench scale reads in whole grams. Multiply 1.75 by 1,000 (shifting the decimal point three places right): 1.75 × 1,000 = 1,750 grams. Weigh out exactly 1,750 g of flour.',
    quickRefValues: [0.1, 0.25, 0.5, 0.75, 1, 1.5, 2, 5, 10, 25],
    commonMistakes: [
      {
        title: 'Multiplying by 100 instead of 1,000',
        description:
          'Because "centi-" means 100 (as in 100 cm = 1 m), people occasionally multiply kg by 100. Remember that "kilo-" always means 1,000: 0.5 kg is 500 g, not 50 g.',
      },
      {
        title: 'Moving the decimal point left instead of right',
        description:
          'A gram is 1,000 times smaller than a kilogram, so the number of grams must always be 1,000 times larger than the number of kilograms.',
      },
      {
        title: 'Confusing grams (g) with milligrams (mg)',
        description:
          'One kilogram is 1,000 grams (g), whereas 1 gram is 1,000 milligrams (mg)—making 1 kg equal to 1,000,000 mg.',
      },
    ],
    faqs: [
      {
        question: 'How many grams are in 1 kilogram?',
        answer:
          'There are exactly 1,000 grams in 1 kilogram.',
      },
      {
        question: 'How many grams is half a kilogram (0.5 kg)?',
        answer:
          'Half a kilogram (0.5 kg) is 500 grams.',
      },
      {
        question: 'How many grams is 0.25 kg (a quarter kilo)?',
        answer:
          '0.25 kilograms equals 250 grams.',
      },
      {
        question: 'Why is the kilogram—not the gram—the SI base unit of mass?',
        answer:
          'When the International System of Units (SI) was standardized in 1960, the kilogram artifact was chosen as the practical base unit for engineering and physics, making it the only SI base unit with a metric prefix.',
      },
    ],
    relatedSlugs: ['gram-to-kg', 'kg-to-pounds', 'gram-to-ounce', 'kg-to-ounce'],
  },

  'km-to-meter': {
    slug: 'km-to-meter',
    whatIsHeading: 'What Is Kilometers to Meters Conversion',
    whatIsParagraphs: [
      'Kilometers to meters conversion translates long-range metric distances in kilometers (km) into the SI base unit of length, the meter (m). While road networks, cycling stages, and geographic distances between cities are measured in kilometers, track and field events (such as the 1,500m, 5,000m, and 10,000m races), civil engineering site plans, and aviation runway lengths are specified in meters.',
      'Because the metric prefix "kilo-" stands for a multiplier of 1,000, one kilometer is defined as exactly 1,000 meters. Converting between the two units requires no irrational constants or fractions—only a three-place decimal shift.',
    ],
    howToHeading: 'How to Convert Kilometers to Meters',
    howToIntro:
      'To convert any distance from kilometers to meters, multiply the kilometer figure by 1,000 (or shift the decimal point three places to the right).',
    formulaBox: 'meters (m) = kilometers (km) × 1,000',
    workedExampleTitle: 'Worked Example: Convert a 2.4 km Running Loop to Meters',
    workedExampleBody:
      'A park jogging trail is marked as a 2.4-kilometer loop, and an athlete wants to know how many 400-meter track laps that equals. First convert 2.4 km to meters: 2.4 × 1,000 = 2,400 meters. (That 2,400-meter loop equals exactly six 400-meter laps.)',
    quickRefValues: [0.1, 0.25, 0.5, 1, 1.5, 2, 5, 10, 21.1, 42.195],
    commonMistakes: [
      {
        title: 'Using the linear 1,000 factor for square kilometers (km²)',
        description:
          '1 kilometer equals 1,000 meters in length, but 1 square kilometer of land area (1,000 m × 1,000 m) equals 1,000,000 square meters—not 1,000 m².',
      },
      {
        title: 'Multiplying by 100 by analogy with meters-to-centimeters',
        description:
          'There are 100 centimeters in a meter, but 1,000 meters in a kilometer. 0.4 km is 400 meters, not 40 meters.',
      },
      {
        title: 'Dividing by 1,000 instead of multiplying',
        description:
          'Dividing by 1,000 converts meters into kilometers. When going from kilometers to smaller meters, the numerical value always grows 1,000-fold.',
      },
    ],
    faqs: [
      {
        question: 'How many meters are in 1 kilometer?',
        answer:
          'There are exactly 1,000 meters in 1 kilometer.',
      },
      {
        question: 'How many meters is a 5K race?',
        answer:
          'The "K" in 5K stands for kilometers, so a 5K race is 5 × 1,000 = 5,000 meters.',
      },
      {
        question: 'How many meters is 0.5 km?',
        answer:
          'Half a kilometer (0.5 km) equals 500 meters.',
      },
      {
        question: 'How many 400-meter track laps make 1 kilometer?',
        answer:
          'Because 1,000 ÷ 400 = 2.5, it takes two and a half laps around a standard 400-meter outdoor track to cover 1 kilometer.',
      },
    ],
    relatedSlugs: ['miles-to-meter', 'km-to-miles', 'miles-to-km', 'meter-to-cm'],
  },

  'mph-to-kmh': {
    slug: 'mph-to-kmh',
    whatIsHeading: 'What Is MPH to KM/H Conversion',
    whatIsParagraphs: [
      'Miles per hour (mph) to kilometers per hour (km/h or kph) conversion translates imperial speed measurements into metric velocity. Drivers crossing between the United States and Canada or between the UK and continental Europe, baseball fans checking fastball radar gun readings, and meteorologists tracking hurricane wind speeds rely on mph-to-km/h conversion.',
      'Because both units measure distance traveled per 1 hour of time, the conversion ratio is identical to the ratio between a statute mile and a kilometer. One statute mile equals 1.609344 kilometers, so 1 mile per hour equals exactly 1.609344 kilometers per hour.',
    ],
    howToHeading: 'How to Convert MPH to KM/H',
    howToIntro:
      'To convert speed from miles per hour (mph) to kilometers per hour (km/h), multiply the mph reading by 1.609344. For a quick mental dashboard check while driving, multiply mph by 1.6.',
    formulaBox: 'km/h = mph × 1.609344',
    workedExampleTitle: 'Worked Example: Convert a 65 mph Highway Speed Limit to km/h',
    workedExampleBody:
      'A US interstate highway posts a speed limit of 65 mph, and you are driving a vehicle whose primary digital speedometer is set to km/h. Multiply 65 by 1.609344: 65 × 1.609344 = 104.607 km/h. Travelling at 65 mph corresponds to roughly 105 km/h.',
    quickRefValues: [5, 10, 25, 30, 45, 55, 60, 65, 70, 100],
    commonMistakes: [
      {
        title: 'Confusing mph with knots (nautical miles per hour) in weather or aviation',
        description:
          'Marine and aviation wind reports often use knots (1 knot = 1.852 km/h = 1.1508 mph). Make sure your source speed is in statute mph before multiplying by 1.609344.',
      },
      {
        title: 'Confusing km/h with meters per second (m/s)',
        description:
          'Physics formulas and European wind gauges frequently use meters per second (1 m/s = 3.6 km/h). Multiplying mph by 1.609344 gives km/h, whereas multiplying mph by 0.44704 gives m/s.',
      },
      {
        title: 'Dividing by 1.6 when reading speed limit signs',
        description:
          'A kilometer is shorter than a mile, so your speed in km/h is always a larger number than in mph (60 mph ≈ 97 km/h).',
      },
    ],
    faqs: [
      {
        question: 'How many km/h is 60 mph?',
        answer:
          '60 miles per hour equals 96.56 km/h (commonly rounded to 97 km/h).',
      },
      {
        question: 'How many km/h is 100 mph?',
        answer:
          '100 mph equals 160.9344 km/h (about 161 km/h), which is considered a major speeding or high-performance benchmark.',
      },
      {
        question: 'What is a 25 mph residential speed limit in km/h?',
        answer:
          '25 mph equals 40.23 km/h, which corresponds directly to the standard 40 km/h urban speed limit in metric countries.',
      },
      {
        question: 'How fast is a 74 mph Category 1 hurricane in km/h?',
        answer:
          '74 mph—the threshold for a Category 1 hurricane on the Saffir-Simpson scale—equals 119.09 km/h.',
      },
    ],
    relatedSlugs: ['kmh-to-mph', 'miles-to-km', 'km-to-miles', 'miles-to-meter'],
  },

  'celsius-to-kelvin': {
    slug: 'celsius-to-kelvin',
    whatIsHeading: 'What Is Celsius to Kelvin Conversion',
    whatIsParagraphs: [
      'Celsius to Kelvin conversion shifts a temperature reading from the everyday Celsius scale (°C) to the Kelvin scale (K), the base unit of thermodynamic temperature in the International System of Units (SI). Physicists applying the Ideal Gas Law (PV = nRT), chemists calculating reaction rates, astronomers measuring stellar spectra, and photographers setting lighting color temperatures (such as 5600 K daylight) use Kelvin.',
      'Proposed by William Thomson (Lord Kelvin) in 1848, the Kelvin scale uses the exact same degree increment as the Celsius scale—a 1 °C temperature rise is identical to a 1 K temperature rise—but anchors its zero point at absolute zero (−273.15 °C), the theoretical point where all thermal molecular motion ceases. Note that by SI convention, Kelvin is written simply as "K" without a degree (°) symbol.',
    ],
    howToHeading: 'How to Convert Celsius to Kelvin',
    howToIntro:
      'Because a Kelvin unit and a Celsius degree have the exact same magnitude, converting Celsius to Kelvin requires no multiplication—simply add 273.15 to the Celsius temperature.',
    formulaBox: 'K = °C + 273.15',
    workedExampleTitle: 'Worked Example: Convert 25 °C Standard Room Temperature to Kelvin',
    workedExampleBody:
      'A chemistry experiment is conducted at a standard laboratory ambient temperature of 25 °C, and the gas law equation requires the absolute temperature T in Kelvin. Add 273.15 to 25: 25 + 273.15 = 298.15 K. Thus, 25 °C equals exactly 298.15 K.',
    quickRefValues: [-273.15, -196, -40, 0, 20, 25, 37, 100, 500, 1000],
    commonMistakes: [
      {
        title: 'Adding 273.15 when converting a temperature change (ΔT)',
        description:
          'Because 1 K equals 1 °C in size, a temperature increase of 15 °C is also a temperature increase of 15 K—never add 273.15 to a temperature difference or specific heat capacity.',
      },
      {
        title: 'Writing a degree symbol (°K) before Kelvin',
        description:
          'Since the 13th General Conference on Weights and Measures in 1967, the unit is officially called the "kelvin" (symbol K), never "degrees Kelvin" (°K).',
      },
      {
        title: 'Forgetting the negative sign on sub-zero Celsius inputs',
        description:
          'When converting liquid nitrogen’s boiling point (−196 °C), you must compute −196 + 273.15 = 77.15 K, not 196 + 273.15.',
      },
    ],
    faqs: [
      {
        question: 'What is 0 °C in Kelvin?',
        answer:
          '0 °C (the freezing point of water at standard pressure) is exactly 273.15 K.',
      },
      {
        question: 'What is 100 °C in Kelvin?',
        answer:
          '100 °C (the boiling point of water) equals 373.15 K (100 + 273.15 = 373.15 K).',
      },
      {
        question: 'Can a Kelvin temperature ever be negative?',
        answer:
          'In classical thermodynamics, no. Zero Kelvin (0 K, or −273.15 °C) is absolute zero, the lowest possible temperature baseline.',
      },
      {
        question: 'Why do gas law formulas require Kelvin instead of Celsius?',
        answer:
          'Gas volume and pressure are directly proportional to absolute thermal energy. Using Celsius would cause division-by-zero at 0 °C and negative volumes below 0 °C.',
      },
    ],
    relatedSlugs: [
      'kelvin-to-celsius',
      'celsius-to-fahrenheit',
      'fahrenheit-to-kelvin',
      'fahrenheit-to-celsius',
    ],
  },

  'inch-to-feet': {
    slug: 'inch-to-feet',
    whatIsHeading: 'What Is Inches to Feet Conversion',
    whatIsParagraphs: [
      'Inches to feet conversion takes a linear measurement recorded in imperial inches (in or ″) and expresses it in feet (ft or ′). In residential construction, cabinetry, appliance installation, and interior design, tape measures are frequently pulled and read in total inches—such as a 36-inch doorway, a 60-inch vanity, or a 96-inch ceiling stud—while architectural floor plans, lumberyard orders, and room dimensions are quoted in feet.',
      'The relationship between the inch and the foot is one of the oldest base-12 (duodecimal) standards in human commerce, dating back to Roman unciae (twelfths of a pes). Exactly 12 inches constitute 1 international foot. Dividing an inch total by 12 converts long inch measurements into compact decimal feet or feet-and-inches notation.',
    ],
    howToHeading: 'How to Convert Inches to Feet',
    howToIntro:
      'To convert inches to decimal feet, divide your inch measurement by 12 (or multiply by 0.0833333). If you want feet and remaining inches instead of a decimal, divide by 12 to find the whole number of feet, and take the remainder as the leftover inches.',
    formulaBox: 'feet (ft) = inches (in) ÷ 12',
    workedExampleTitle: 'Worked Example: Convert an 80-Inch Interior Door Height to Feet',
    workedExampleBody:
      'A standard American interior bedroom door measures 80 inches tall. Divide 80 by 12: 80 ÷ 12 = 6.6667 feet. In feet and inches, 12 goes into 80 six times (6 × 12 = 72 inches) with 8 inches left over, so an 80-inch door is 6.67 decimal feet, or 6 feet 8 inches (written 6′ 8″ on framing plans).',
    quickRefValues: [6, 12, 18, 24, 30, 36, 48, 60, 72, 96],
    commonMistakes: [
      {
        title: 'Reading decimal feet as feet and inches (e.g., 5.5 ft as 5 ft 5 in)',
        description:
          'When 66 inches is divided by 12, the calculator displays 5.5 feet. Because 0.5 of a 12-inch foot is 6 inches, 66 inches is 5 feet 6 inches—never 5 feet 5 inches.',
      },
      {
        title: 'Dividing by 10 instead of 12',
        description:
          'Unlike the metric system, the imperial foot is base-12. Dividing 60 inches by 10 gives 6 feet instead of the true 5 feet (60 ÷ 12 = 5 ft).',
      },
      {
        title: 'Using the linear ÷ 12 factor for square inches (in²)',
        description:
          'A 12 in × 12 in floor tile covers 144 square inches (1 sq ft). To convert square inches to square feet, divide by 144, not 12.',
      },
    ],
    faqs: [
      {
        question: 'How many feet is 36 inches?',
        answer:
          '36 inches equals exactly 3 feet (36 ÷ 12 = 3 ft), which is also 1 yard.',
      },
      {
        question: 'How many feet is 72 inches?',
        answer:
          '72 inches equals 6 feet (72 ÷ 12 = 6 ft).',
      },
      {
        question: 'What is 1 inch expressed as a decimal foot?',
        answer:
          'One inch is 1/12 of a foot, which equals 0.08333 feet.',
      },
      {
        question: 'How many feet is a 65-inch Sofa or TV?',
        answer:
          '65 inches equals 5.4167 decimal feet, or 5 feet and 5 inches (60 in + 5 in).',
      },
    ],
    relatedSlugs: ['feet-to-inch', 'inch-to-cm', 'feet-to-meter', 'yard-to-inch'],
  },

  'feet-to-inch': {
    slug: 'feet-to-inch',
    whatIsHeading: 'What Is Feet to Inches Conversion',
    whatIsParagraphs: [
      'Feet to inches conversion multiplies a length in imperial feet (ft) into individual inches (in). Carpenters cutting wall studs, seamstresses calculating curtain drop lengths, shipping clerks measuring corrugated box girth, and parents tracking a growing child’s height on a wall chart routinely convert feet into total inches for faster layout and cutting.',
      'Because every foot is composed of 12 equal inches, converting from feet to inches eliminates compound units (like 4 ft 9 in) in favor of a single continuous number (57 in). Working in total inches on a table saw or mitre station significantly reduces layout subtraction mistakes.',
    ],
    howToHeading: 'How to Convert Feet to Inches',
    howToIntro:
      'To convert any measurement in feet to inches, multiply the foot value by 12. If you are starting with a mixed measurement such as 5 feet 4 inches, multiply the 5 feet by 12 (60 inches) and add the 4 inches to get 64 inches.',
    formulaBox: 'inches (in) = feet (ft) × 12',
    workedExampleTitle: 'Worked Example: Convert an 8-Foot Plywood Sheet to Inches',
    workedExampleBody:
      'A standard sheet of cabinet-grade plywood is 8 feet long, and you want to rip it into equal shelf strips marked in inches. Multiply 8 by 12: 8 × 12 = 96 inches. An 8-foot sheet of plywood is exactly 96 inches long.',
    quickRefValues: [0.5, 1, 1.5, 2, 3, 4, 5, 6, 8, 10],
    commonMistakes: [
      {
        title: 'Treating 5.8 feet as 5 feet 8 inches before converting',
        description:
          'If a survey drawing lists a clearance of 5.8 decimal feet, multiply the entire 5.8 × 12 = 69.6 inches. Do not treat 5.8 ft as 5 ft 8 in (which is 68 inches).',
      },
      {
        title: 'Dividing by 12 instead of multiplying',
        description:
          'An inch is smaller than a foot, so there are 12 times as many inches as feet. Your converted inch number must always be 12 times larger than your foot input.',
      },
      {
        title: 'Confusing prime symbols (′ and ″) on blueprints',
        description:
          'A single prime mark (′) denotes feet, while a double prime mark (″) denotes inches. Thus, 4′ means 4 feet (48 inches), not 4 inches.',
      },
    ],
    faqs: [
      {
        question: 'How many inches are in 1 foot?',
        answer:
          'There are exactly 12 inches in 1 international foot.',
      },
      {
        question: 'How many inches is 5 feet?',
        answer:
          '5 feet equals 60 inches (5 × 12 = 60 in).',
      },
      {
        question: 'How many inches is 6 feet?',
        answer:
          '6 feet equals 72 inches (6 × 12 = 72 in).',
      },
      {
        question: 'How many inches is 5.5 feet?',
        answer:
          '5.5 feet equals 66 inches (5.5 × 12 = 66 in), or 5 feet 6 inches.',
      },
    ],
    relatedSlugs: ['inch-to-feet', 'feet-to-cm', 'feet-to-meter', 'yard-to-inch'],
  },

  'feet-to-cm': {
    slug: 'feet-to-cm',
    whatIsHeading: 'What Is Feet to Centimeters Conversion',
    whatIsParagraphs: [
      'Feet to centimeters conversion bridges the imperial foot (ft) with the metric centimeter (cm). International visa applications, hospital biometric intake forms, ski and snowboard sizing tables, and IKEA or European furniture catalogs specify lengths and human heights in centimeters, even when users know their measurements in feet.',
      'Since 1 inch is internationally defined as 2.54 centimeters and 1 foot contains 12 inches, 1 foot equals 12 × 2.54 = 30.48 centimeters. Because both 12 and 2.54 are exact statutory constants, 30.48 centimeters per foot is completely exact with zero trailing decimals.',
    ],
    howToHeading: 'How to Convert Feet to Centimeters',
    howToIntro:
      'To convert a measurement in feet to centimeters, multiply the number of feet by 30.48. If you have a height in feet and inches (such as 5 ft 8 in), either convert the inches to decimal feet first (5 + 8/12 = 5.6667 ft) and multiply by 30.48, or multiply the feet by 30.48 and add (inches × 2.54).',
    formulaBox: 'centimeters (cm) = feet (ft) × 30.48',
    workedExampleTitle: 'Worked Example: Convert a 6-Foot Dining Table Length to cm',
    workedExampleBody:
      'You are shopping for a 6-foot dining room table and want to compare it against metric dining tables listed in centimeters. Multiply 6 by 30.48: 6 × 30.48 = 182.88 cm. A 6-foot table is 182.88 centimeters (roughly 183 cm) long.',
    quickRefValues: [1, 2, 3, 4, 5, 5.5, 6, 7, 8, 10],
    commonMistakes: [
      {
        title: 'Typing 5 ft 10 in as 5.10 into a decimal feet calculator',
        description:
          'In decimal notation, 5.10 is the same as 5.1 feet (5 feet 1.2 inches = 155.45 cm). For 5 feet 10 inches, 10 ÷ 12 = 0.8333, so enter 5.8333 ft to get the true 177.8 cm.',
      },
      {
        title: 'Multiplying by 30 instead of 30.48',
        description:
          'Rounding the factor down to 30 cm per foot loses nearly half a centimeter per foot—leaving a 6-foot person 2.88 cm (more than an inch) shorter on paper.',
      },
      {
        title: 'Confusing centimeters (cm) with meters (m)',
        description:
          'Multiplying feet by 30.48 gives centimeters (e.g., 6 ft = 182.88 cm), whereas multiplying by 0.3048 gives meters (1.8288 m).',
      },
    ],
    faqs: [
      {
        question: 'How many centimeters are in 1 foot?',
        answer:
          'There are exactly 30.48 centimeters in 1 international foot.',
      },
      {
        question: 'How many cm is 5 feet?',
        answer:
          '5 feet equals exactly 152.4 centimeters (5 × 30.48 = 152.4 cm).',
      },
      {
        question: 'How many cm is 5.5 feet (5 ft 6 in)?',
        answer:
          '5.5 feet equals 167.64 centimeters (about 168 cm).',
      },
      {
        question: 'How many cm is an 8-foot ceiling?',
        answer:
          'A standard 8-foot residential ceiling is 243.84 centimeters high (roughly 2.44 meters).',
      },
    ],
    relatedSlugs: ['cm-to-feet', 'inch-to-cm', 'feet-to-meter', 'feet-to-inch'],
  },

  'meter-to-yard': {
    slug: 'meter-to-yard',
    whatIsHeading: 'What Is Meters to Yards Conversion',
    whatIsParagraphs: [
      'Meters to yards conversion transforms metric distance or fabric length in meters (m) into imperial yards (yd). Apparel manufacturers sourcing European wool or silk bolts sold by the meter, competitive swimmers translating 100m or 400m freestyle times to a 25-yard NCAA pool, and golfers using laser rangefinders switch between meters and yards constantly.',
      'Because 1 international yard is defined as exactly 0.9144 meters, 1 meter is slightly longer than 1 yard: 1 ÷ 0.9144 = 1.093613298 yards. In practical terms, every meter gives you 1 full yard plus an extra 3.37 inches (about 9.4% more length).',
    ],
    howToHeading: 'How to Convert Meters to Yards',
    howToIntro:
      'To convert meters into yards, divide the meter measurement by 0.9144 (or multiply by 1.0936133). For a quick mental estimate on the golf course or athletics track, add roughly 10 percent (9.36%) to the meter figure.',
    formulaBox: 'yards (yd) = meters (m) ÷ 0.9144   (or m × 1.0936133)',
    workedExampleTitle: 'Worked Example: Convert a 150-Meter Golf Approach Shot to Yards',
    workedExampleBody:
      'A metric fairway marker indicates 150 meters to the center of the green, and your golf club distances are memorized in yards. Multiply 150 by 1.0936133 (or divide 150 by 0.9144): 150 ÷ 0.9144 = 164.042 yards. The shot plays 164 yards—more than one full club longer than 150 yards.',
    quickRefValues: [1, 2, 5, 10, 25, 50, 100, 200, 400, 1000],
    commonMistakes: [
      {
        title: 'Buying 1 yard of fabric per 1 meter required by a sewing pattern',
        description:
          'If a European dress pattern calls for 3 meters of fabric and you buy 3 yards at an American fabric store, you will be short by 25.7 cm (over 10 inches). 3 meters requires 3.28 yards.',
      },
      {
        title: 'Multiplying by 0.9144 instead of dividing',
        description:
          'Because a yard is shorter than a meter, the converted number of yards must always be larger than the starting number of meters.',
      },
      {
        title: 'Using the linear 1.0936 factor for cubic meters of concrete or mulch',
        description:
          'Linear meters convert to yards by × 1.0936, but 1 cubic meter of volume (m³) equals 1.30795 cubic yards (1.0936³).',
      },
    ],
    faqs: [
      {
        question: 'How many yards are in 1 meter?',
        answer:
          'One meter equals approximately 1.0936 yards (or 1 yard and 3.37 inches).',
      },
      {
        question: 'How many yards is a 100-meter dash?',
        answer:
          'A 100-meter sprint equals 109.361 yards—nearly 10 yards longer than an American football field between goal lines.',
      },
      {
        question: 'Is a meter longer or shorter than a yard?',
        answer:
          'A meter is longer than a yard by 8.56 centimeters (3.37 inches).',
      },
      {
        question: 'How many yards is 50 meters?',
        answer:
          '50 meters equals 54.6807 yards.',
      },
    ],
    relatedSlugs: ['yard-to-meter', 'meter-to-feet', 'feet-to-meter', 'yard-to-inch'],
  },

  'mm-to-inch': {
    slug: 'mm-to-inch',
    whatIsHeading: 'What Is Millimeters to Inches Conversion',
    whatIsParagraphs: [
      'Millimeters to inches conversion translates fine metric lengths in millimeters (mm) into imperial inches (in). Machinists reading CNC engineering blueprints, mechanics matching metric socket wrenches to SAE bolts, 3D-printing enthusiasts configuring nozzle diameters, and watch collectors comparing 40 mm vs 42 mm watch case widths rely on millimeter-to-inch conversion.',
      'One meter contains 1,000 millimeters, and one centimeter contains 10 millimeters. Because the international inch is defined as exactly 2.54 centimeters, 1 inch equals exactly 25.4 millimeters. Consequently, 1 millimeter is equal to 1 ÷ 25.4, or approximately 0.03937008 inches (just under 40 thousandths of an inch, or "40 thou").',
    ],
    howToHeading: 'How to Convert Millimeters to Inches',
    howToIntro:
      'To convert a measurement from millimeters to inches, divide the millimeter reading by 25.4 (or multiply by 0.03937008). Dividing by 25.4 is preferred in precision machining because 25.4 is an exact terminating constant.',
    formulaBox: 'inches (in) = millimeters (mm) ÷ 25.4',
    workedExampleTitle: 'Worked Example: Convert a 10 mm Wrench Socket to Inches',
    workedExampleBody:
      'A mechanic needs the decimal inch equivalent of a 10 mm hex bolt head. Divide 10 by 25.4: 10 ÷ 25.4 = 0.3937 inches. Comparing that to standard fractional SAE sockets, 3/8 inch is 0.375 in (too small) and 13/32 inch is 0.406 in, showing why a 10 mm socket (0.3937 in) has no exact fractional SAE twin.',
    quickRefValues: [1, 2, 3, 5, 6, 8, 10, 12, 25.4, 100],
    commonMistakes: [
      {
        title: 'Dividing by 2.54 instead of 25.4',
        description:
          '2.54 is the factor for centimeters, not millimeters. Dividing millimeters by 2.54 makes your inch result 10 times too large (e.g., 10 mm is 0.3937 in, not 3.937 in).',
      },
      {
        title: 'Forcing a metric fastener into the nearest 1/16-inch SAE wrench',
        description:
          'Except for 19 mm (which is 0.748 in, extremely close to 3/4 in = 0.750 in), most millimeter bolt sizes fall between standard fractional inch steps and can strip if forced.',
      },
      {
        title: 'Confusing "mil" (thousandth of an inch) with millimeter (mm)',
        description:
          'In US manufacturing and plastic film gauges, 1 "mil" or "thou" means 0.001 inches (0.0254 mm), whereas 1 millimeter (mm) is 39.37 mils.',
      },
    ],
    faqs: [
      {
        question: 'How many inches is 1 millimeter?',
        answer:
          'One millimeter equals approximately 0.03937 inches (about 39.4 thousandths of an inch, or roughly 1/25 of an inch).',
      },
      {
        question: 'How many millimeters are in 1 inch?',
        answer:
          'There are exactly 25.4 millimeters in 1 international inch.',
      },
      {
        question: 'What fraction of an inch is closest to 6 mm?',
        answer:
          '6 mm equals 0.2362 inches, which is just slightly smaller than 1/4 inch (0.250 in = 6.35 mm).',
      },
      {
        question: 'How many inches is a 40 mm wristwatch case?',
        answer:
          'A 40 mm watch case measures 1.5748 inches (just over 1 and a half inches) in diameter.',
      },
    ],
    relatedSlugs: ['inch-to-mm', 'inch-to-cm', 'cm-to-inch', 'cm-to-meter'],
  },

  'inch-to-mm': {
    slug: 'inch-to-mm',
    whatIsHeading: 'What Is Inches to Millimeters Conversion',
    whatIsParagraphs: [
      'Inches to millimeters conversion transforms imperial lengths in inches (in) into metric millimeters (mm). Mechanical engineers specifying tolerances on ISO drawings, woodworkers setting metric Festool track-saw depth stops from American lumber thicknesses, electronics designers laying out PCB hole spacing, and jewelers sizing ring bands convert inches into millimeters.',
      'Under the 1959 international definition, 1 inch is fixed at exactly 25.4 millimeters. Because a millimeter is a small, fine unit (about the thickness of a credit card or a dime), expressing fractional inch measurements in millimeters replaces awkward fractions like 11/32″ or 27/64″ with clean decimal numbers.',
    ],
    howToHeading: 'How to Convert Inches to Millimeters',
    howToIntro:
      'To convert inches to millimeters, multiply the inch value by 25.4. If your starting measurement is a fraction (such as 3/8 of an inch), divide the numerator by the denominator first (3 ÷ 8 = 0.375 in) and then multiply by 25.4.',
    formulaBox: 'millimeters (mm) = inches (in) × 25.4',
    workedExampleTitle: 'Worked Example: Convert a 3/4-Inch Plywood Thickness to mm',
    workedExampleBody:
      'A cabinetmaker is working with 3/4-inch (0.75 in) sheet stock and needs to set a metric router bit depth in millimeters. Multiply 0.75 by 25.4: 0.75 × 25.4 = 19.05 mm. Three-quarter-inch plywood is 19.05 millimeters thick (which corresponds to standard 18 mm or 19 mm metric panels).',
    quickRefValues: [0.125, 0.25, 0.375, 0.5, 0.75, 1, 2, 4, 6, 12],
    commonMistakes: [
      {
        title: 'Multiplying by 2.54 instead of 25.4',
        description:
          'Multiplying inches by 2.54 yields centimeters (cm), not millimeters (mm). Always multiply by 25.4 so your millimeter value is 10 times larger than centimeters.',
      },
      {
        title: 'Confusing nominal lumber inches with actual dressed millimeters',
        description:
          'An American "2×4" stud is actually 1.5 in × 3.5 in after kiln drying and planing, which converts to 38.1 mm × 88.9 mm—not 50.8 mm × 101.6 mm.',
      },
      {
        title: 'Entering fractions like 1/8 inch as 1.8',
        description:
          'One-eighth of an inch (1 ÷ 8) is 0.125 inches (3.175 mm). Entering 1.8 inches calculates 45.72 mm instead.',
      },
    ],
    faqs: [
      {
        question: 'How many millimeters are in 1 inch?',
        answer:
          'There are exactly 25.4 millimeters in 1 inch.',
      },
      {
        question: 'How many mm is 1/2 inch (0.5 in)?',
        answer:
          'Half an inch (0.5 in) equals exactly 12.7 millimeters.',
      },
      {
        question: 'How many mm is 1/4 inch (0.25 in)?',
        answer:
          'One-quarter of an inch (0.25 in) equals exactly 6.35 millimeters.',
      },
      {
        question: 'How many mm is 1/8 inch (0.125 in)?',
        answer:
          'One-eighth of an inch (0.125 in) equals 3.175 millimeters.',
      },
    ],
    relatedSlugs: ['mm-to-inch', 'inch-to-cm', 'cm-to-inch', 'inch-to-feet'],
  },

  'meter-to-cm': {
    slug: 'meter-to-cm',
    whatIsHeading: 'What Is Meters to Centimeters Conversion',
    whatIsParagraphs: [
      'Meters to centimeters conversion scales a measurement from the SI base unit of length—the meter (m)—down to centimeters (cm). While room dimensions, building plots, and athletics tracks are measured in meters, garment sewing patterns, human stature charts, shipping box dimensions, and school rulers use centimeters to avoid decimal fractions.',
      'In the International System of Units, the prefix "centi-" means one hundredth (10⁻²). Therefore, every 1 meter is subdivided into exactly 100 centimeters. Converting from meters to centimeters is an exact base-10 operation that simply shifts the decimal point two places to the right.',
    ],
    howToHeading: 'How to Convert Meters to Centimeters',
    howToIntro:
      'To convert any length from meters to centimeters, multiply the meter value by 100 (or move the decimal point two digits to the right).',
    formulaBox: 'centimeters (cm) = meters (m) × 100',
    workedExampleTitle: 'Worked Example: Convert a 2.15-Meter Wardrobe Height to cm',
    workedExampleBody:
      'An architectural drawing shows an alcove height of 2.15 meters, and the furniture catalog lists wardrobe heights in centimeters. Multiply 2.15 by 100: 2.15 × 100 = 215 cm. You have 215 centimeters of vertical clearance.',
    quickRefValues: [0.1, 0.25, 0.5, 0.75, 1, 1.5, 1.75, 2, 5, 10],
    commonMistakes: [
      {
        title: 'Using the linear × 100 factor for square meters (m²)',
        description:
          '1 linear meter is 100 cm, but 1 square meter of area (100 cm × 100 cm) equals 10,000 square centimeters (cm²)—not 100 cm².',
      },
      {
        title: 'Multiplying by 1,000 instead of 100',
        description:
          'Multiplying meters by 1,000 converts to millimeters (mm). For centimeters (cm), always multiply by 100 (e.g., 1.8 m = 180 cm = 1,800 mm).',
      },
      {
        title: 'Shifting the decimal point left instead of right',
        description:
          'Because a centimeter is smaller than a meter, the centimeter number must always be 100 times larger than the meter number.',
      },
    ],
    faqs: [
      {
        question: 'How many centimeters are in 1 meter?',
        answer:
          'There are exactly 100 centimeters in 1 meter.',
      },
      {
        question: 'How many cm is 1.5 meters?',
        answer:
          '1.5 meters equals 150 centimeters.',
      },
      {
        question: 'How many cm is half a meter (0.5 m)?',
        answer:
          'Half a meter (0.5 m) is 50 centimeters.',
      },
      {
        question: 'How many cm is 1.75 meters?',
        answer:
          '1.75 meters equals 175 centimeters.',
      },
    ],
    relatedSlugs: ['cm-to-meter', 'meter-to-feet', 'cm-to-inch', 'km-to-meter'],
  },

  'cm-to-meter': {
    slug: 'cm-to-meter',
    whatIsHeading: 'What Is Centimeters to Meters Conversion',
    whatIsParagraphs: [
      'Centimeters to meters conversion takes a metric length measured in centimeters (cm) and expresses it in standard SI meters (m). Homeowners calculating how many square meters of flooring or wallpaper to order from centimeter tape-measure readings, students plugging lengths into physics equations (which require SI base meters), and medical researchers computing Body Mass Index (BMI = kg/m²) convert centimeters to meters.',
      'Because 100 centimeters make 1 meter, each centimeter is exactly one hundredth (0.01) of a meter. Converting from centimeters to meters requires dividing by 100, which cleanly shifts the decimal point two places to the left.',
    ],
    howToHeading: 'How to Convert Centimeters to Meters',
    howToIntro:
      'To convert centimeters into meters, divide the centimeter value by 100 (or multiply by 0.01, shifting the decimal point two places to the left).',
    formulaBox: 'meters (m) = centimeters (cm) ÷ 100   (or cm × 0.01)',
    workedExampleTitle: 'Worked Example: Convert 172 cm Height to Meters for a BMI Calculation',
    workedExampleBody:
      'The Body Mass Index formula (weight in kg ÷ height in m²) requires height in meters. For a person who is 172 cm tall, divide 172 by 100: 172 ÷ 100 = 1.72 meters. You then square 1.72 m (1.72 × 1.72 = 2.9584 m²) in the BMI denominator.',
    quickRefValues: [1, 5, 10, 25, 50, 75, 100, 150, 175, 200],
    commonMistakes: [
      {
        title: 'Dividing square centimeters (cm²) by 100 instead of 10,000',
        description:
          'When calculating room or tile area in cm², remember that 1 m² = 100 cm × 100 cm = 10,000 cm². Convert the length and width from cm to m BEFORE multiplying them together.',
      },
      {
        title: 'Dividing by 1,000 instead of 100',
        description:
          '100 centimeters equal 1 meter (whereas 1,000 millimeters equal 1 meter). Dividing 150 cm by 1,000 gives 0.15 m instead of the true 1.5 m.',
      },
      {
        title: 'Forgetting the leading zero on lengths under 10 cm',
        description:
          'When shifting the decimal two places left on a single-digit number like 8 cm, be careful to write 0.08 meters—not 0.8 meters (which is 80 cm).',
      },
    ],
    faqs: [
      {
        question: 'How many meters is 100 centimeters?',
        answer:
          '100 centimeters is exactly 1 meter.',
      },
      {
        question: 'How many meters is 1 centimeter?',
        answer:
          'One centimeter equals 0.01 meters (one hundredth of a meter).',
      },
      {
        question: 'What is 50 cm in meters?',
        answer:
          '50 centimeters equals 0.5 meters (half a meter).',
      },
      {
        question: 'What is 180 cm in meters?',
        answer:
          '180 centimeters equals 1.8 meters.',
      },
    ],
    relatedSlugs: ['meter-to-cm', 'cm-to-feet', 'cm-to-inch', 'feet-to-meter'],
  },

  'miles-to-meter': {
    slug: 'miles-to-meter',
    whatIsHeading: 'What Is Miles to Meters Conversion',
    whatIsParagraphs: [
      'Miles to meters conversion translates imperial statute miles (mi) directly into metric meters (m). Track and field coaches comparing the classic 1-mile run against the Olympic 1,500-meter and 1,600-meter events, rowers calibrating indoor ergometers (which measure split times per 500 meters), and aviation pilots checking visibility minimums in meters use this conversion.',
      'Historically, the English statute mile was standardized in 1593 during the reign of Queen Elizabeth I as 8 furlongs, or 5,280 feet (1,760 yards). When the international foot was locked at 0.3048 meters in 1959, one statute mile became fixed at 5,280 × 0.3048 = 1,609.344 meters.',
    ],
    howToHeading: 'How to Convert Miles to Meters',
    howToIntro:
      'To convert any distance in statute miles to meters, multiply the number of miles by the exact conversion factor 1,609.344.',
    formulaBox: 'meters (m) = miles (mi) × 1,609.344',
    workedExampleTitle: 'Worked Example: Compare a 1.5-Mile Fitness Run to Meters',
    workedExampleBody:
      'Many military and law-enforcement physical readiness tests feature a timed 1.5-mile run. To run that exact distance on a 400-meter metric track, multiply 1.5 by 1,609.344: 1.5 × 1,609.344 = 2,414.016 meters. That equals six full 400-meter laps (2,400 m) plus an extra 14.02 meters.',
    quickRefValues: [0.25, 0.5, 1, 1.5, 2, 3, 5, 10, 13.1, 26.2],
    commonMistakes: [
      {
        title: 'Treating 1,600 meters as an exact 1-mile record distance',
        description:
          'US high school tracks run the 1,600 meters (four 400m laps), which is 9.344 meters (30 feet 7.9 inches) shorter than a true 1,609.344-meter statute mile. Elite mile times are about 1.5 to 2 seconds slower than 1,600m times.',
      },
      {
        title: 'Confusing statute miles with nautical miles (1,852 m)',
        description:
          'A nautical mile used at sea and in airspace is defined as exactly 1,852 meters—about 242.66 meters longer than a 1,609.344-meter land mile.',
      },
      {
        title: 'Equating the 1,500m "metric mile" with a full mile',
        description:
          'The Olympic 1,500m event is nicknamed the "metric mile," but it is 109.344 meters (nearly 120 yards) shorter than 1 statute mile.',
      },
    ],
    faqs: [
      {
        question: 'How many meters are in 1 mile?',
        answer:
          'There are exactly 1,609.344 meters in 1 international statute mile.',
      },
      {
        question: 'How many meters is a quarter mile (0.25 mi)?',
        answer:
          'A quarter mile (the classic drag-strip and 1-lap track distance) is 402.336 meters—just over one 400-meter track lap.',
      },
      {
        question: 'How many meters is a half mile (0.5 mi)?',
        answer:
          'Half a mile (0.5 mi) equals 804.672 meters.',
      },
      {
        question: 'How many 400-meter laps equal 1 full mile?',
        answer:
          'One full mile is 4.02336 laps around a 400-meter track (4 full laps plus 9.34 meters).',
      },
    ],
    relatedSlugs: ['miles-to-km', 'km-to-meter', 'km-to-miles', 'feet-to-meter'],
  },

  'pounds-to-ounce': {
    slug: 'pounds-to-ounce',
    whatIsHeading: 'What Is Pounds to Ounces Conversion',
    whatIsParagraphs: [
      'Pounds to ounces conversion breaks down weight measured in avoirdupois pounds (lb) into smaller ounces (oz). E-commerce fulfillment teams entering parcel weights into postage software, butchers and meal-preppers dividing bulk meat packages into individual servings, and pediatric nurses recording newborn birth weights use this conversion every day.',
      'The modern avoirdupois pound—standardized in 14th-century wool trade and reaffirmed in 1959—is divided into 16 ounces. Unlike base-10 metric units, a decimal pound reading on a digital scale (such as 2.75 lb) cannot be read directly as ounces without multiplying the decimal portion by 16.',
    ],
    howToHeading: 'How to Convert Pounds to Ounces',
    howToIntro:
      'To convert any weight in pounds to total ounces, multiply the pound figure by 16. If your scale shows pounds and ounces (such as 3 lb 6 oz), multiply the whole pounds by 16 (3 × 16 = 48 oz) and add the remaining 6 ounces to get 54 ounces.',
    formulaBox: 'ounces (oz) = pounds (lb) × 16',
    workedExampleTitle: 'Worked Example: Convert a 2.35-Pound Shipping Box to Ounces',
    workedExampleBody:
      'A digital postal scale displays a package weight of 2.35 pounds, and your shipping label form requires total ounces. Multiply 2.35 by 16: 2.35 × 16 = 37.6 ounces. The package weighs 37.6 ounces (or 2 pounds and 5.6 ounces).',
    quickRefValues: [0.25, 0.5, 0.75, 1, 1.5, 2, 3, 5, 10, 20],
    commonMistakes: [
      {
        title: 'Reading 1.5 pounds as 1 pound 5 ounces',
        description:
          'Because a pound has 16 ounces (not 10), 0.5 lb is half of 16, which is 8 ounces. Thus, 1.5 pounds equals 1 pound 8 ounces (24 oz total), not 1 lb 5 oz.',
      },
      {
        title: 'Confusing avoirdupois ounces with fluid ounces of volume',
        description:
          'A 1-pound (16 oz) bag of coffee beans weighs 16 avoirdupois ounces on a scale, but it will fill much more than a 16-fluid-ounce (1 pint) liquid measuring cup because roasted coffee is less dense than water.',
      },
      {
        title: 'Using 16 ounces per pound for troy pounds of bullion',
        description:
          'Standard kitchen, body, and shipping scales use the 16-ounce avoirdupois pound. The historic troy pound used in coinage contains only 12 troy ounces.',
      },
    ],
    faqs: [
      {
        question: 'How many ounces are in 1 pound?',
        answer:
          'There are exactly 16 ounces in 1 standard avoirdupois pound.',
      },
      {
        question: 'How many ounces is half a pound (0.5 lb)?',
        answer:
          'Half a pound (0.5 lb) is 8 ounces.',
      },
      {
        question: 'How many ounces is a quarter pound (0.25 lb)?',
        answer:
          'A quarter pound (0.25 lb) equals 4 ounces.',
      },
      {
        question: 'How many ounces are in 2 pounds?',
        answer:
          '2 pounds equals 32 ounces (2 × 16 = 32 oz).',
      },
    ],
    relatedSlugs: ['ounce-to-pounds', 'pounds-to-kg', 'ounce-to-gram', 'gram-to-ounce'],
  },
};


