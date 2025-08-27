import "./Trailer.css";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";

function Trailer() {
  let params = useParams();
  let key = params.ytTrailerId;
  console.log(key);
  console.log(`https://www.youtube.com/watch?v=${key}`);

  return (
    <div className="react-player-container">
      {key != null ? (
        <ReactPlayer
          src={`https://www.youtube.com/watch?v=${key}`}
          playing={true}
          controls={true}
          width="100%"
          height="100%"
          muted={false}
        />
      ) : null}
    </div>
  );
}

export default Trailer;
