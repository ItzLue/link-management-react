import React from 'react';
import {IVideoData} from "../../types/api/data";

type IProps = { data?: IVideoData };

const Framing: React.FC<IProps> = ({ data }) => {
    return(
        <div>
            <div className='text-center'>
                <p>FRAMING DATA</p>
            </div>
            <div className='text-center bg-green-300 h-full'>
                <p>Errors detected {data?.ping}</p>
                <p>Errors corrected {data?.bitrate}</p>
            </div>
        </div>
    )
}


export default Framing;