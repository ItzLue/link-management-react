import React from 'react';
import {IVideoData} from "../../types/api/data";

type IProps = { data?: IVideoData };

const History: React.FC<IProps> = ({ data }) => {
    return(
        <div>
            <div className='text-center bg-yellow-400'>
                <p>HISTORY DATA</p>
            </div>
        </div>
    )
}


export default History;