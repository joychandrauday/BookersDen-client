import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link, useLoaderData } from "react-router-dom";
// import Swiper styles
import "./styles.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FaUserPlus } from "react-icons/fa6";
import Marquee from "react-fast-marquee";

// import required modules
import { Autoplay, Navigation } from "swiper/modules";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../Provider/Provider";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Home = () => {
  const [genre, setGenre] = useState([]);
  const { user } = useContext(AuthContext);
  const [books, setTotalBooks] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/genre")
      .then((data) => setGenre(data?.data));
    console.log(genre);
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/allbooks")
      .then((data) => setTotalBooks(data?.data));
    console.log(genre);
  }, []);

  return (
    <div className="">
      <Helmet>
        <title>Bookers Den: Discover, Learn, Flourish</title>
      </Helmet>
      <div className="home-slider">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 5500,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Navigation]}
          className="mySwiper "
        >
          <SwiperSlide className="slideheight slide1">
            <div>
              <div className="slider-container container mx-auto lg:flex items-center justify-center text-left capitalize p-12 lg:pl-24">
                <div className="left-text text-center">
                  <img
                    src="https://i.ibb.co/McLzr4x/2.gif"
                    alt=""
                    className="sslideInm w-96 mx-auto rounded-md shadow-lg mb-5"
                  />
                  <h1 className="font-bold text-2xl  lg:text-5xl text-white">
                    a vibrant center dedicated to the exploration of knowledge
                    through the pages of books.
                  </h1>
                  <p className="my-4 text-white">
                    Empower travelers with innovative tools and seamless
                    solutions to enhance their journey from start to finish.
                  </p>
                  <div className="flex items-center gap-2 justify-center">
                    <Link
                      to={"/all-books"}
                      className="btn bg-basic rounded-none text-white border-none hover:text-basic hover:text-white"
                    >
                      borrow books
                    </Link>
                    <Link
                      to={"/librarian-registration"}
                      className="btn btn-outline border border-gray-300 hover:bg-white hover:text-black  text-white
                    rounded-none"
                    >
                      <FaUserPlus /> join as librarian
                    </Link>
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
                    Discover, Learn, Flourish
                  </h1>
                  <p className="my-4 text-white">
                    Our motto reflects our commitment to facilitating discovery,
                    fostering learning, and nurturing personal growth.
                  </p>
                  <Link
                    to={user ? "/all-books" : "/sign-up"}
                    className="btn bg-basic text-yellow-400 hover:text-basic rounded-none border-none"
                  >
                    Start Borrowing
                  </Link>
                </div>
                <div className="right-video basis-1/2 lg:flex hidden items-center justify-center">
                  <div
                    style={{
                      backgroundImage:
                        "url(https://i.ibb.co/SQFNGGc/original-e0893b0cb5499b195baaf18ab595e940.gif)",
                      backgroundSize: "cover",
                      backgroundPosition: "center center",
                    }}
                    className="w-[350px] h-[350px] rounded"
                  >
                    {/* <img src="https://i.ibb.co/SQFNGGc/original-e0893b0cb5499b195baaf18ab595e940.gif" alt="" className="w-full mx-auto rounded" /> */}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="slideheight slide3">
            <div className="min-h-screen flex">
              <div className="slider-container container mx-auto lg:flex items-center justify-center text-left capitalize p-12 lg:pl-24">
                <div className="left-text text-center">
                  <h1 className="font-bold text-2xl lg:text-5xl text-white">
                    easy to find,easy to borrow.
                  </h1>
                  <p className="my-4 text-white">
                    With a rich collection of books spanning various genres and
                    subjects, along with dynamic programs and events, books den
                    serves as a catalyst for intellectual curiosity and lifelong
                    learning.
                  </p>
                  <Link
                    to={user ? "/all-books" : "/sign-up"}
                    className="btn  rounded-none border-none"
                  >
                    explore now.
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="staT bg-fixed justify-center lg:min-h-[500px] flex items-center">
        <div className="backdrop-blur-lg">
          <div className="lg:flex items-center justify-center">
            <div className="booksNum flex gap-8 justify-center items-center ">
              <div className="stat flex items-center flex-row-reverse shadow-lg rounded shadow-black px-16 h-44 content-center">
                <div className="stat-figure text-primary">
                  <img
                    src="https://i.ibb.co/YpTh1NJ/Animation-1715408242086.gif"
                    alt=""
                  />
                </div>
                <div>
                  <div className="stat-title">Total Books</div>
                  <div className="stat-value text-6xl text-white">
                    {books.length}+
                  </div>
                </div>
              </div>
              <div className="stat flex items-center flex-row-reverse shadow-lg rounded shadow-black px-16 h-44 content-center">
                <div className="stat-figure text-primary">
                  <img
                    src="https://i.ibb.co/9ZGb35P/Animation-1715407230811.gif"
                    alt=""
                  />
                </div>
                <div>
                  <div className="stat-title">Book Genre</div>
                  <div className="stat-value text-6xl text-white">
                    {genre.length}+
                  </div>
                </div>
              </div>
              <div className="stat flex items-center flex-row-reverse shadow-lg rounded shadow-black px-16 h-44 content-center">
                <div className="stat-figure text-primary">
                  <img
                    src="https://i.ibb.co/zfvJ87V/Animation-1715407778169.gif"
                    alt=""
                  />
                </div>
                <div>
                  <div className="stat-title">Registered Readers</div>
                  <div className="stat-value text-6xl text-white">450+</div>
                  <div className="stat-desc">And counting...</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlay
          autoPlaySpeed={2000}
          centerMode={false}
          className=""
          containerClass="container-with-dots"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite={false}
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1024,
              },
              items: 3,
              partialVisibilityGutter: 40,
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0,
              },
              items: 1,
              partialVisibilityGutter: 30,
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464,
              },
              items: 2,
              partialVisibilityGutter: 30,
            },
          }}
          rewind
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          showDots={false}
          sliderClass=""
          slidesToSlide={2}
          swipeable
        >
          {genre.map((Genre) => (
            <div
              key={Genre?._id}
              style={{
                backgroundImage: `url(${Genre?.image})`,
                height: "300px",
                // width: "300px",
                backgroundSize: "cover",
                backgroundPosition: "center center",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Link
                to={`/genre/${Genre?.genre}`}
                className="countryElement h-[300px] w-full flex items-center justify-center flex-col p-5 text-left text-white"
              >
                <h1 className="capitalize font-bold  text-2xl genreName">
                  {Genre?.genre}
                </h1>
              </Link>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Home;
