import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import mehul from "../../../assets/images/mehul.webp";
import kashyap from "../../../assets/images/kashyap.webp";
import rohit from "../../../assets/images/rohit.webp";
import piyush from "../../../assets/images/piyush.webp";
import bhargav from "../../../assets/images/bhargav.webp";
import maulik from "../../../assets/images/maulik.webp";

const TestimonialSlider = () => {
    const testimonials = [
        {
            id: 1,
            avatar: mehul,
            quote: "SchedulX has revolutionized how we manage our social media campaigns. The ability to schedule and track posts in one place has saved us countless hours every week.",
            company: "DressUp",
            name: "Mehul Gupta",
            title: "Digital Marketer"
        },
        {
            id: 2,
            avatar: kashyap,
            quote: "SchedulX simplifies the entire content creation and collaboration process. Our team is more aligned, and engagement metrics have improved significantly.",
            company: "Lenscbl",
            name: "Kashyap Chauhan",
            title: "Marketing Manager"
        },
        {
            id: 3,
            avatar: rohit,
            quote: "As a content manager, SchedulX has been a game-changer for me. The analytics dashboard provides actionable insights, helping me create posts that truly resonate with our audience.",
            company: "HappySocks",
            name: "Rohit Talaviya",
            title: "Social Media Content Manager"
        },
        {
            id: 4,
            avatar: piyush,
            quote: "From automated scheduling to detailed previews, SchedulX ensures that every post aligns perfectly with our brand identity. It's a must-have tool for any content professional.",
            company: "HappySocks",
            name: "Piyush Sarvaliya",
            title: "Social Media Content Manager"
        },
        {
            id: 5,
            avatar: bhargav,
            quote: "SchedulX’s hashtag suggestions and scheduling features have boosted our engagement rates. It's the ultimate tool for staying consistent and growing our online presence.",
            company: "HappySocks",
            name: "Bhargav Pandya",
            title: "Social Media Content Manager"
        },
        {
            id: 6,
            avatar: maulik,
            quote: "With SchedulX, managing multiple platforms has never been easier. The intuitive interface and real-time collaboration features keep our entire team on the same page.",
            company: "HappySocks",
            name: "Maulik Paghadal",
            title: "Social Media Content Manager"
        }
    ];

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <Slider {...settings}>
            {testimonials.map((testimonial) => (
                <div
                    key={testimonial.id}
                    className="max-w-[410px] p-6 rounded-3xl mx-auto border  border-gray-200 hover:border-slate-800 dark:hover:border-slate-500 transition-all duration-200 hover:cursor-grab relative mt-12 space-x-4"
                    style={{ margin: "0 15px" }}
                >
                    <img
                        src={testimonial.avatar}
                        alt={`${testimonial.name}'s avatar`}
                        className="w-20 h-20 rounded-full absolute right-0 left-0 mx-auto -top-12 border-4 border-white bg-white dark:bg-black "
                    />
                    <div className="mt-6 text-center">
                        <blockquote className="text-base text-gray-600 dark:text-slate-200 font-normal leading-normal">
                            {testimonial.quote}
                        </blockquote>
                        <div className="mt-4">
                            <h2 className="text-lg font-extrabold text-gray-800 dark:text-white mb-2">{testimonial.name}</h2>
                            <p className="text-sm font-medium text-gray-500">{testimonial.title}</p>
                        </div>
                    </div>
                </div>
            ))}
        </Slider>
    );
};

export default TestimonialSlider;

