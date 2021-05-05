import React from 'react';
import {IVideoData} from "../../types/api/data";

type IProps = { data?: IVideoData };

const Encryption: React.FC<IProps> = ({ data }) => {
    return(
        <div>
            <div className='text-center'>
                <p>ENCRYPTION DATA</p>
            </div>
            <div className='text-center bg-red-400'>
                <p> Encryption {data?.ping}</p>
                <p>Type RSA</p>
            </div>
        </div>
    )
}


export default Encryption;