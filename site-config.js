// Lord of Crust site settings. Edit this file to change these details; no other file needs to change.
window.LOC_CONFIG = {
  // Instagram page link, e.g. "https://instagram.com/yourhandle"
  instagram: "",

  // Link where customers write a review (from your Google Business Profile: "Ask for reviews")
  googleReviewUrl: "",

  // Your Google Maps listing link (used by "Get directions"). Leave empty to search by name.
  googleMapsUrl: "",

  // Optional: Google Maps > Share > Embed a map > copy ONLY the src="..." link here
  mapsEmbedUrl: "",

  // Opening hours text, e.g. "Daily 12:00 PM - 11:00 PM". Leave empty to hide.
  hours: "",

  // Google reviews widget: paste the widget's HTML container here, and its script URL(s) below.
  // Example from a widget service: reviewsHtml: '<div class="some-widget-class"></div>',
  //                                reviewsScripts: ["https://example.com/widget.js"],
  reviewsHtml: "",
  reviewsScripts: [],

  // Delivery areas (only these can be chosen for home delivery, ~2 km from the shop).
  // Example: deliveryAreas: ["Sector 7", "Sector 8", "Model Town"],
  // Leave empty to allow any address (no restriction).
  deliveryAreas: [],
  deliveryNote: "We deliver only within 2 km of the shop. If your area is not listed, please choose Pickup or Dine-in.",

  // Book-for-event page. Leave empty to use the defaults, or list your own facilities:
  // eventFacilities: [{ title: "Full hall booking", text: "..." }, { title: "Sound system", text: "..." }],
  eventFacilities: [],
  // Shown as small tags on the event page, e.g. ["Birthdays", "Anniversaries"]
  eventTypes: ["Birthdays", "Anniversaries", "Kitty parties", "Family get-togethers", "Corporate meets"],
  // Optional, shown if filled, e.g. "up to 60 guests"
  eventCapacity: "",

  // Gallery photos. Upload images to the images/gallery/ folder, then list them here:
  // gallery: [{ src: "images/gallery/oven.jpg", alt: "Our wood-fired oven" }],
  gallery: [],
};
