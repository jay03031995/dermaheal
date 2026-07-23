export const CLINIC = {
  name: "Dermaheal Skin & Hair Clinic",
  tagline: "Top Skin & Hair Clinic in Dwarka, Delhi",
  phone: "+91 80809 10191",
  phone2: "+91 73794 64999",
  email: "info.dermaheal@gmail.com",
  address:
    "C-712, Ramphal Chowk, Block D, Sector 7 Dwarka, Palam, near Shiksha Bharti School, New Delhi 110075",
  hours: "Mon to Sat 10:00 AM to 7:30 PM · Sun 10:00 AM to 7:00 PM",
  cities: ["Dwarka", "New Delhi"],
  shopUrl: "https://www.dermaheal.co.in/shop",
  reviewsUrl: "https://share.google/dc4lU10Jdo97k42ij",
  social: {
    instagram: "https://www.instagram.com/dermaheal_india/",
    youtube: "https://www.youtube.com/channel/UC-LDcHNfsYcll-fprvwIilQ",
    facebook: "https://www.facebook.com/DERMAHEALINDIA",
  },
};

const digits = (s: string) => s.replace(/[^0-9]/g, "");

export const telHref = (phone: string = CLINIC.phone) =>
  "tel:" + phone.replace(/\s/g, "");

export const waHref = (text?: string) => {
  const base = "https://wa.me/91" + digits(CLINIC.phone).slice(-10);
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
};
