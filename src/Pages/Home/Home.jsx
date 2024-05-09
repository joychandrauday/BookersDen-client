import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link, useLoaderData } from "react-router-dom";
// import Swiper styles
import "./styles.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FaCirclePlay } from "react-icons/fa6";
import { Fade } from "react-awesome-reveal";
import { Tooltip } from 'react-tooltip'
// import required modules
import { Autoplay, Navigation } from "swiper/modules"; 
import SingleDEstinationCard from "../../Components/SingleDEstinationCard/SingleDEstinationCard";
import { Helmet } from "react-helmet-async";

const Home = () => {
    const[user,setUser]=useState(true)
    const[countries,setCountries]=useState([])
    const destinations=useLoaderData()
    useEffect(()=>{
        fetch('https://travelpulseserver.vercel.app/countries')
        .then(res=>res.json())
        .then(data=>setCountries(data));
    },[])
    console.log(countries)
  return (
    <div className="">
        <Helmet>
            <title>Travel pulse- your travel partner.</title>
        </Helmet>
      <div className="home-slider">
        <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
            delay: 5500,
            disableOnInteraction: true,
            pauseOnMouseEnter:true,
            }}
            
            pagination={{
            clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Navigation]}
            className="mySwiper "
        >
            <SwiperSlide className="slideheight slide1" >
            <div>
                <div className="slider-container container mx-auto lg:flex items-center justify-center text-left capitalize p-12 lg:pl-24">
                <div className="left-text basis-1/2">
                    <h1 className="font-bold text-2xl lg:text-5xl text-white">your one stop tourism solution
                    </h1>
                    <p className="my-4 text-white">Empower travelers with innovative tools and seamless solutions to enhance their journey from start to finish.
                    </p>
                    <div className="flex items-center gap-2">
                    <Link to={"/all-spots"} className="btn bg-basic rounded-none text-white border-none hover:text-basic">view destinations</Link>
                    <Link to={"/contact"} className="btn btn-outline border border-gray-300 hover:glass hover:text-white text-white
                    rounded-full "><FaCirclePlay />set a date</Link>
                    </div>
                </div>
                <div className="right-video basis-1/2 lg:flex items-center justify-center hidden">
                    <div className="relative">
                        <img
                        className="w-96"
                        src="https://i.ibb.co/FgZV1x1/32226183-m001t0309-b-5-star-rating-30aug22-removebg-preview.png"
                        alt="" 
                        />
                        <h1 className="font-extrabold uppercase  text-yellow-400 absolute bottom-32 left-24 text-2xl px-4 w-full   rounded-full">top class sevice.<br></br><span className="text-xl capitalize italic font-light">with <span className="text-xl px-2 bg-basic font-bold">97%</span> client satisfition</span></h1>
                        
                    </div>
                </div>
                </div>
            </div>
            </SwiperSlide>
            <SwiperSlide className="slideheight slide2">
            <div className="flex min-h-screen">
                <div className="slider-container container mx-auto lg:flex items-center justify-center text-left capitalize p-12 lg:pl-24">
                <div className="left-text basis-1/2">
                    <h1 className="font-bold text-2xl lg:text-5xl text-white">
                    convenience with enthusiasm.
                    </h1>
                    <p className="my-4 text-white">
                    we provide all type of tourism facilities at a reasonable price.
                    </p>
                    <Link to={user?"/all-spots":"/sign-up"} className="btn bg-basic text-yellow-400 hover:text-basic rounded-none border-none">book now</Link>
                </div>
                <div className="right-video basis-1/2 lg:flex hidden items-center justify-center">
                    <img
                    className="slideImg"
                    src="https://i.ibb.co/qCzbS3d/27997026-tour-set-13-removebg-preview.png"
                    alt=""
                    />
                </div>
                </div>
            </div>
            </SwiperSlide>
            <SwiperSlide className="slideheight slide3">
            <div className="min-h-screen flex">
                <div className="slider-container container mx-auto lg:flex items-center justify-center text-left capitalize p-12 lg:pl-24">
                <div className="left-text text-center">
                    <h1 className="font-bold text-2xl lg:text-5xl text-white">
                    we provides comfort and luxary according to your preference.
                    </h1>
                    <p className="my-4 text-white">Promoting responsible tourism practices to preserve destinations for future generations.
                    </p>
                    <Link to={user?"/all-spots":"/sign-up"} className="btn bg-yellow-400 rounded-none border-none">start customize</Link>
                </div>
                </div>
            </div>
            </SwiperSlide>
        </Swiper>
      </div>
      <div className="lg:h-0 relative py-4">
        <div className="statSection lg:h-96 flex items-center justify-center ">
            <div className="stats lg:stats-horizontal stats-vertical lg:absolute z-50 lg:top-[-50px] shadow rounded-none text-white bg-basic" data-aos="fade-up">
            <div className="stat capitalize ">
                <div className="stat-title text-white">Blog published</div>
                <div className="stat-value">560</div>
            </div>

            <div className="stat">
                <div className="stat-title text-white">Total visitors</div>
                <div className="stat-value">45,000 +</div>
                <div className="stat-desc text-white">↗︎ 400 (22%)</div>
            </div>

            <div className="stat ">
                <div className="stat-title text-white">Happy Client</div>
                <div className="stat-value">1500+</div>
            </div>
            </div>
        </div>
      </div>
      <div className="card-section lg:py-64 container mx-auto">
        <div className="lg:flex gap-8 p-4">
            <div className="basis-1/2">
                <Fade cascade damping={0.1}>
                    
                    <h1 className="lg:text-6xl text-3xl font-bold font-dancing">Explore All Corners of The World With Us</h1>
                    <div className="py-5">
                        <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
                        <p className="pt-4">A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.</p>
                    </div>
                    <button className="btn text-white font-dancing px-12 text-xl  bg-basic rounded-full hover:text-basic capitalize">read more</button>
                </Fade>
            </div>
            <div className="basis-1/2 relative">
                <div className="image-wrapper flex justify-center">
                    <Fade>

                        <div className="image-1lg:w-64 w-44 lg:h-96 border-4 lg:absolute right-12 bottom-8">
                            <img src="https://i.ibb.co/fHFGd3N/eberhard-grossgasteiger-j-CL98-LGaeo-E-unsplash.jpg" alt="" className="h-[-webkit-fill-available]"/>
                        </div>
                    </Fade>
                    <Fade>
                        <div className="image-1 image-1 w-44 lg:w-64 lg:h-96 border-4 lg:absolute left-12 top-8">
                            <img src="https://i.ibb.co/QKt4GMn/daniel-roe-lpjb-UMOyx8-unsplash.jpg" alt="" className="h-[-webkit-fill-available]"/>
                        </div>

                    </Fade>
                </div>
            </div>
        </div>
      </div>
      <div className="tourists-spot py-12">
        <div className="container mx-auto p-4">
            <h1 className="capitalize font-bold text-3xl">tourist spots</h1>
            <div className="lg:grid md:grid lg:grid-cols-3 md:grid-cols-2 gap-4">
                {
                    destinations.slice(0,6).map(destination=><SingleDEstinationCard key={destination._id} destination={destination}></SingleDEstinationCard>)
                }
            </div>
           <div className="text-center mt-5">
             <Link to={'/all-spots'} className="btn px-12 rounded-none hover:text-basic bg-basic text-white capitalize">view all spots</Link>
           </div>
        </div>
      </div>
      <div className="country-section ">
        <div className="">
            <div className="lg:grid grid-cols-3">
                {
                    countries.map(country=><div 
                        style={{
                            backgroundImage:`url(${country.image})`,
                            height:'300px',
                            backgroundSize:'cover',
                            backgroundPosition:'center center',
                            cursor:'pointer',
                            display:'flex',
                            alignItems:'center',
                            justifyContent:'center'
                            
                        }}
                       
                        className="countryCard"
                        key={country._id}>
                            <Link to={`/countries/${country.country_Name}`} className="countryElement h-[300px] w-full flex items-start justify-center hover:backdrop-blur-md flex-col p-5 text-left gap-4 text-white lg:hidden "  data-tooltip-id="my-tooltip"
                        data-tooltip-content="Click to see the spot list of this country.">
                                
                                <h1 className="capitalize font-bold  text-2xl">{country.country_Name}</h1>
                                <p>{country.short_description}</p>
                            </Link>
                            <Tooltip id="my-tooltip" />
                    </div>)
                }
            </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
