export const NAV = [
  { href: '#serve', label: 'The plate' },
  { href: '#story', label: 'Our story' },
  { href: '#heritage', label: 'Heritage' },
  { href: '#menu', label: 'Menu' },
  { href: '#locations', label: 'Locations' },
  { href: '#visit', label: 'Visit' },
]

export const MURAL_LINE = {
  ms: 'Pi mai, pi mai, Hameediyah jugak',
  en: "No matter where you go or what you do, you'll always end up back at Hameediyah",
}

export const FACTS = [
  { big: '1907', small: 'Serving George Town for over a century' },
  { big: 'Malaysia Book of Records', small: "Officially the country's oldest nasi kandar restaurant" },
  { big: '7 generations', small: 'One family, one recipe, passed down' },
]

export const SERVE_NOTES = [
  {
    key: 'rice',
    title: 'Fluffy rice',
    body: 'Steamed long-grain rice, light and loose, ready to soak up every gravy.',
    box: { x: 70, y: 248, w: 240 },
    line: 'M468 540 C440 450 380 330 322 300',
    dot: [468, 540],
  },
  {
    key: 'lamb',
    title: 'Soft lamb shank',
    body: 'Braised slowly in whole spices until the meat comes away from the bone.',
    box: { x: 892, y: 742, w: 250 },
    line: 'M766 614 C820 650 860 700 884 748',
    dot: [766, 614],
  },
  {
    key: 'okra',
    title: 'Okra, Penang style',
    body: 'Cut fresh and tossed with mustard seeds, chilli and curry leaves.',
    box: { x: 60, y: 764, w: 250 },
    line: 'M356 694 C330 720 290 745 256 762',
    dot: [356, 694],
  },
  {
    key: 'gravy',
    title: 'Banjir gravy',
    body: 'Ask for it flooded: curries poured over the rice and mixed the Penang way.',
    box: { x: 650, y: 112, w: 260 },
    line: 'M602 538 C620 440 632 300 650 212',
    dot: [602, 538],
  },
]

export const TIMELINE = [
  { year: '1907', title: 'The doors open', body: "Hameediyah opens on Lebuh Campbell, George Town, and gives Penang's street-side nasi kandar a home." },
  { year: 'Generations', title: 'Passed hand to hand', body: 'Over seven generations, the family keeps the kitchen, the recipes and the counter on Lebuh Campbell.' },
  { year: '2020', title: 'Malaysia Book of Records', body: 'Hameediyah is officially recognised as the oldest nasi kandar restaurant in Malaysia.' },
  { year: '2020', title: 'Sungai Ara opens on Merdeka Day', body: 'A new branch opens on 31 August, and the family launches ready-to-eat curry pouches so diners can take Hameediyah home.' },
  // VERIFY: confirm Menu Rahmah is still running before launch.
  { year: '2023', title: 'Menu Rahmah', body: 'Hameediyah joins the Menu Rahmah initiative to keep a hearty, affordable meal on the table for everyone.' },
  { year: 'Today', title: 'The seventh generation', body: 'The same recipes, served on Lebuh Campbell and at branches across Penang and the Klang Valley.' },
]

export const FEATURES = [
  { title: 'Pick your curries', body: 'Point at the pots and the team will build your plate. Ask for a banjir ("flooded") plate with extra gravy and get the full Penang experience.' },
  { title: 'Two floors', body: 'A busy counter on the ground floor and an air-conditioned dining hall upstairs for families and groups.' },
  { title: 'Takeaway and catering', body: 'Every dish is available to take away. For weddings, kenduri and office lunches, our catering comes from Hameediyah Tandoori House.' },
  // VERIFY: current ready-to-eat range.
  { title: 'Ready to eat at home', body: 'Reheatable pouches of beef rendang, ayam ros and kambing cincang: a taste of Lebuh Campbell, ready in minutes.' },
]

export const DISHES = [
  { name: 'Nasi Kandar', body: 'Steamed rice with your pick of curries, fried chicken and vegetables, the gravies mixed the Penang way.', art: 'kandar', alt: 'A plate of nasi kandar with fried chicken, okra, prawn and curry over rice, with sambal on the side' },
  { name: 'Nasi Biryani', body: 'Fragrant golden biryani with tender chicken or mutton, one of our most-ordered plates.', art: 'biryani', alt: 'Golden nasi biryani with a chicken leg and salad on a Hameediyah plate' },
  { name: 'Murtabak', body: 'A ghee-crisped pancake stuffed with spiced meat, egg and onion. Try it with cheese.', art: 'murtabak', alt: 'Murtabak on a steel tray with curry dip and pickled onions' },
  { name: 'Chicken Kapitan', body: 'A classic Penang curry: rich, aromatic and deeply comforting.', art: 'kapitan', alt: 'Chicken curry with potatoes in a claypot' },
  { name: 'Beef Rendang', body: 'Beef slow-cooked in coconut and spices until it falls apart.', art: 'rendang', alt: 'Dark, dry beef rendang on a patterned plate' },
  { name: 'Mutton Kurma', body: 'Mild, creamy and fragrant, a gentle curry for every palate.', art: 'kurma', alt: 'Mutton kurma with potatoes in a white bowl' },
]

// VERIFY: confirm each branch is open and add full addresses.
export const LOCATIONS = [
  { name: 'Lebuh Campbell', region: 'The original, since 1907', body: '164A Lebuh Campbell, 10100 George Town, Penang', extra: ['+60 4-261 1095', '10:30 AM to 10:00 PM'], flagship: true },
  { name: 'Butterworth', region: 'Penang', body: 'On the mainland, same family recipes.' },
  { name: 'Sungai Ara', region: 'Penang', body: 'Opened on Merdeka Day 2020, seating about 85 guests.' },
  { name: 'Kota Damansara', region: 'Selangor', body: "Penang's nasi kandar in Petaling Jaya." },
]

export const CONTACT = {
  address: '164A Lebuh Campbell, 10100 George Town, Penang, Malaysia',
  // VERIFY: one source says closed Fridays, another says open daily.
  hours: '10:30 AM to 10:00 PM',
  phone: '+60 4-261 1095',
  phoneHref: 'tel:+6042611095',
  maps: 'https://www.google.com/maps/search/?api=1&query=Hameediyah+Restaurant+Lebuh+Campbell+George+Town+Penang',
  facebook: 'https://www.facebook.com/HAMEEDIYAHRESTAURANTSDNBHD1025046U',
}

const commons = (file) => `https://commons.wikimedia.org/wiki/File:${file}`

// VERIFY: the hero/portrait mural photos and the nasi kandar and biryani plate photos came from the client's
// reference folder (one is a frame from a third-party YouTube review); confirm rights or replace before launch.
export const CREDITS = [
  { what: 'Rattan basket', title: 'Rattan baskets DSC00588', author: 'ROCKY', licence: 'CC BY-SA 4.0', url: commons('Rattan_baskets_-_বেতের_ঝুড়ি_-_DSC00588.jpg') },
  { what: 'Tiffin carrier', title: 'Old silver camping pot', author: 'dof pinhole', licence: 'Pexels License', url: 'https://www.pexels.com/photo/old-silver-camping-bot-16052430/' },
  { what: 'Clay pot', title: 'A depiction of mud pot with lid', author: 'Thamizhpparithi Maari', licence: 'CC BY-SA 3.0', url: commons('A_depiction_of_mud_pot_with_lid.JPG') },
  { what: 'Plate', title: 'A yellow plate sitting on top of a white table', author: 'servet photograph', licence: 'Unsplash License', url: 'https://unsplash.com/photos/sBTWWive5ZI' },
  { what: 'Rice', title: 'White rice at a restaurant', author: 'Calgary Reviews', licence: 'CC BY 2.0', url: commons('White_rice_at_a_restaurant.jpg') },
  { what: 'Lamb shank', title: "Brasserie Chanteclair (Lyon) - souris d'agneau", author: 'Benoît Prieur', licence: 'CC0', url: commons("Brasserie_Chanteclair_(Lyon)_-_souris_d'agneau_(avril_2022).jpg") },
  { what: 'Okra', title: 'Abelmoschus esculentus-3-yercaud-salem-India', author: 'Yercaud-elango', licence: 'CC BY-SA 4.0', url: commons('Abelmoschus_esculentus-3-yercaud-salem-India.JPG') },
  { what: 'Curry gravy', title: 'Chicken curry Trivandrum', author: 'Abhilashsnair', licence: 'CC0', url: commons('Chicken_curry_Trivandrum.jpg') },
  { what: 'Curry leaves', title: 'Curry patta', author: 'Miansari66', licence: 'Public domain', url: commons('Curry_patta.JPG') },
  { what: 'Dried chillies', title: 'Byadgi Chilli', author: 'Rajaramraok', licence: 'CC BY-SA 4.0', url: commons('Byadgi_Chilli.jpg') },
  { what: 'Penang street vendors, 1928', title: 'Straatverkopers in Penang, KITLV 1403994', author: 'The Federal Rubber Stamp Co. / KITLV, Leiden University Libraries', licence: 'CC BY 4.0', url: commons('Straatverkopers_in_Penang,_KITLV_1403994.tiff') },
  { what: 'Hameediyah shopfront and street', title: 'Hameediyah 1, 2 and 3', author: 'Slleong', licence: 'CC0', url: 'https://commons.wikimedia.org/wiki/Category:Hameediyah_Restaurant,_Penang' },
  { what: 'Murtabak', title: 'Murtabak at Makan2 Perth', author: 'Orderinchaos', licence: 'CC BY-SA 4.0', url: commons('Murtabak_at_Makan2_Perth.jpg') },
  { what: 'Beef rendang', title: 'Beef Rendang', author: 'Miansari66', licence: 'CC0', url: commons('Beef_Rendang..JPG') },
  { what: 'Mutton kurma', title: 'Mutton Khorma, Hyderabad India', author: 'Abhinaba Basu', licence: 'CC BY 2.0', url: commons('Mutton_Khorma,_Hyderabad_India.jpg') },
  { what: 'Chicken curry', title: 'Chicken curry 2', author: 'ProjectManhattan', licence: 'CC BY-SA 3.0', url: commons('Chicken_curry_2.jpg') },
]
