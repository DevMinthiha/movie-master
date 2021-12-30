import React, { useEffect, useState } from "react";
import { AiFillStar, AiFillHeart } from "react-icons/ai";
import { BsFillPlayFill, BsPlusLg } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    addToWatchList,
    removeFromWatchList,
} from "../redux/Actions/WathListAction";
import "./trendscard.css";

export const TrendsCard = ({ mediaType, id, img, name, rating, count }) => {
    const [favorite, setFavorite] = useState(false);

    const { list } = useSelector((state) => state.watchList);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        list.find((item) => item.id === id)
            ? setFavorite(true)
            : setFavorite(false);
    }, [list]);

    const goDetails = () => {
        navigate(`/${mediaType}/${id}`);
    };

    const addToList = () => {
        dispatch(addToWatchList(mediaType, id));
    };

    const favorited = () => {
        favorite
            ? dispatch(removeFromWatchList(id))
            : dispatch(addToWatchList(mediaType, id));

        favorite ? setFavorite(false) : setFavorite(true);
    };

    return (
        <div className="trends-card text-white rounded-lg pb-4 font-roboto">
            <div
                className="h-3/4 w-full overflow-hidden flex justify-center trends-card-img-container mb-3 px-4 pt-4
            "
            >
                {img && (
                    <div className="trends-card-hover px-4 py-2 flex flex-col justify-center items-center gap-4">
                        <button
                            onClick={goDetails}
                            className="text-sm bg-primary font-bold font-sm rounded-full px-3 py-2 flex items-center gap-1 shadow-primary"
                        >
                            <BsFillPlayFill style={{ fontSize: "22px" }} />
                            VIEW DETAILS
                        </button>

                        <button
                            onClick={addToList}
                            className="text-sm bg-secondary text-white font-bold font-sm rounded-full px-3 py-3 flex items-center gap-2"
                        >
                            <BsPlusLg style={{ fontSize: "15px" }} />
                            ADD TO LIST
                        </button>
                    </div>
                )}
                {img ? (
                    <img src={`https://image.tmdb.org/t/p/w500${img}`} alt="" />
                ) : (
                    <div className="img-implemention text-lg">
                        <span>Image's not available!</span>
                    </div>
                )}
            </div>
            <div className="px-4">
                <h2 className="font-bold text-lg mb-1">{name}</h2>
                <div className="flex items-center justify-between">
                    <div className="flex flex-wrap flex-col s_base:flex-row sm:flex-row md:flex-col lg:flex-row lgitems-center s_base:gap-3 sm:gap-2 md:gap-0 lg:gap-3">
                        <h4 className="flex items-center text-yellow-500 gap-1 font-bold">
                            <AiFillStar style={{ fontSize: "18px" }} /> {rating}
                        </h4>
                        <h4>({count} ratings)</h4>
                    </div>
                    <div
                        className={
                            favorite
                                ? "text-primary cursor-pointer p-1"
                                : "text-gray-500 cursor-pointer p-1"
                        }
                        onClick={favorited}
                    >
                        <AiFillHeart style={{ fontSize: "20px" }} />
                    </div>
                </div>
            </div>
        </div>
    );
};
