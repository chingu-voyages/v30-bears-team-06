import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export default function TvshowCard(props) {
    const { name, vote_average, poster_path } = props.tvshow;

    const addToWatching = () => {};
    const baseThumbUrl = process.env.REACT_APP_BASE_IMG_URL;
    const baseThumbW = process.env.REACT_APP_BASE_THUMB_WIDTH;

    return (
        <div className="show__card">
            <div className="show__card-image">
            <button
                type="button"
                className="show__card-add"
                onClick={() => addToWatching()}
            >
                <FontAwesomeIcon icon={faHeart} />
            </button>
            <img alt={name} src={`${baseThumbUrl}/${baseThumbW}/${poster_path}`} />
            <span className="show__card-vote">{vote_average}</span>
            </div>
            <p className="show__card-name">{name}</p>
      </div>
    )
}
