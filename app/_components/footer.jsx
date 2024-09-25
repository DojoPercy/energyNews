import React from "react";
import {
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  const quickLinks = [
    { name: "About Us", href: "#" },
    { name: "Contact Us", href: "#" },
    { name: "Advertise", href: "#" },
    { name: "Become a Contributor", href: "#" },
    { name: "Privacy Policy", href: "#" },
  ];
  const ContactUs = () => (
    <div className="text-white">
      <h3 className="text-xl font-bold mb-4">Contact Us</h3>
      
      
      
      <div className="mb-4">
        <p className="flex items-start space-x-2">
          <FaMapMarkerAlt />
          <span><strong>Corporate Office:</strong> {contactDetails.corporateOffice}</span>
        </p>
      </div>
      
      <div className="mb-4">
        <p className="flex items-start space-x-2">
          <FaMapMarkerAlt />
          <span><strong>Sales & Marketing Office:</strong> {contactDetails.salesMarketingOffice}</span>
        </p>
      </div>
    </div>
  );
  const editorialContact = {
    name: "Harry Anim-Addo",
    email: "info@radcommgroup.com",
    phone: "+971 545848860",
  };
  const advertisingContact = {
    name: "Richmond A. Damoah",
    email: "richmond@radcommgroup.com",
    phone: "+971 557909643",
  };

  const partnershipContact = {
    name: "Rhema A. Damoah",
    email: "rhema@radcommgroup.com",
    phone: "+971 509253801",
  };
  const contactDetails = {
   
    corporateOffice: 'RADComm Group, Kwabenya, Ghana West-Africa.',
    salesMarketingOffice: 'Dubai, UAE',
  };
  const Contact = ({ title, contact }) => (
    <div className="  text-white  ">
      <h3 className="text-lg font-bold mb-4 uppercase ">{title}</h3>
      <p className="text-sm">
        {contact.name}
      </p>
      <p className="flex items-center space-x-1 text-sm">
        <FaEnvelope />
        <span>
          <strong>Email:</strong>
        </span>
        <a
          href={`mailto:${contact.email}`}
          className="text-blue-400 text-sm hover:text-blue-300"
        >
          {contact.email}
        </a>
      </p>
      <p className="flex items-center space-x-1 text-sm">
        <FaPhoneAlt />
        <span>
          <strong>Phone:</strong>
        </span>
        <a
          href={`tel:${contact.phone}`}
          className="text-blue-400 hover:text-blue-300"
        >
          {contact.phone}
        </a>
      </p>
    </div>
  );
  const LinkList = ({ title, links }) => (
    <div className="mb-6 sm:mb-0 col-span-1 px-2 lg:px-14 ">
      <span className="text-xl text-left font-bold mb-6">{title}</span>
      <ul
        className="space-y-2 flex justify-start flex-col items-start mt-4
      "
      >
        {links.map((link, index) => (
          <li key={index}>
            <a
              href={link.href}
              className="text-white hover:text-gray-400 transition duration-300 block"
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <footer className="bg-blueTheme text-white pt-8 sm:pt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 w-full justify-between sm:gap-y-8 ">
          {/* About Us */}
          <div className="mb-6 sm:mb-0 col-span-1 flex justify-center flex-col items-start">
            <img
              src="/logo_white.png"
              alt="logo"
              className=" w-[15rem]  mb-4"
            />

            <p className="text-sm">
              The Energy Governance Middle East & Africa Magazine is the premier
              news platform dedicated to serving the entire energy sector across
              the region. Our publication is a hub for original, insightful
              content that not only drives critical discussions but also shapes
              industry perspectives through continuous thought leadership.
            </p>
          </div>

          {/* Wqick Links Links */}
          <LinkList title="Quick Links" links={quickLinks} />

          {/* Useful Links */}
          <div className="flex flex-col gap-4 ">
            <Contact title="For Editorial" contact={editorialContact} />
            <Contact title="For Advertising" contact={advertisingContact} />
          </div>

          {/* Sister Sites */}
          <div className="flex flex-col ">
            <Contact title="For Partnership" contact={partnershipContact} />
          </div>
          <div className="flex flex-col justify-start items-center">
   
    <ContactUs />
          </div>
        </div>

        {/* Copyright */}
      </div>
      <div className="mt-8 text-center text-xs sm:text-sm bg-secondaryBlue w-full py-3">
        <p>
          Copyright &copy; 2024. Published by RADComm Group. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
