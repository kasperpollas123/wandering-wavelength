export interface Testimonial {
  quote: string;
  author: string;
  location: string;
  image?: string;
}

export const testimonials: Testimonial[] = [
  {
    quote: "Mr. Guillermo did a fantastic job. He was my attorney and I could not be happier. He did exactly what he said he would do. He took care of my legal issues quickly. He said he would get my record expunged and he delivered. If you have any legal issues, hire Mr. Guillermo, rest assured he will handle it.",
    author: "Jack",
    location: "Sacramento, CA",
    image: "/images/attorneys/attorney-silhouette.svg"
  },
  {
    quote: "Spodek Law showed the utmost professionalism while handling my case. They got my charges marked down significantly, and the case ended with an expunged record. Alexander Zhik and Ralph Franco are top-notch lawyers.",
    author: "Spencer L.",
    location: "New York, NY",
    image: "/images/attorneys/attorney-silhouette.svg"
  },
  {
    quote: "Constantine was an amazing lawyer and helped me majorly with my life. They got my record cleared and everything. They are just an amazing law firm.",
    author: "Cam",
    location: "Dallas, TX",
    image: "/images/attorneys/attorney-silhouette.svg"
  },
  {
    quote: "I highly recommend contacting Mr. Mike Howard if you are looking for an attorney. My case was successfully dismissed after serving probation, and he is working on the expungement so that my background records stay clean. Mr. Howard clearly explained his plan to dismiss my case from the beginning.",
    author: "M.P.",
    location: "Dallas, TX",
    image: "/images/attorneys/attorney-silhouette.svg"
  },
  {
    quote: "I recently had the pleasure of working with Attorney Jeff Voll, and I am beyond impressed with his exceptional legal services. Jeff successfully handled my case, leading to my charge being expunged. From the start, he was professional, knowledgeable, and genuinely committed to achieving the best outcome for me.",
    author: "Sarah K.",
    location: "Los Angeles, CA",
    image: "/images/attorneys/attorney-silhouette.svg"
  },
  {
    quote: "It was wonderful working with Jonathan and Andrew! They really took care of me as I got my record cleared. Would definitely recommend anyone in California use these guys!",
    author: "Michael R.",
    location: "San Francisco, CA",
    image: "/images/attorneys/attorney-silhouette.svg"
  }
];
