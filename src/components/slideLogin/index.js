import React, { useEffect, useState } from 'react';
import { Carousel } from 'antd';

import "./index.less";

export default function SlideLogin() {

    return (
        <div>
            <Carousel effect="fade" dots={false} autoplay>
                <div>
                    <div className="col-banners" style={{ backgroundImage: `url(${require("../../assets/img-home.jpg")})` }}></div>
                </div>
                <div>
                    <div className="col-banners" style={{ backgroundImage: `url(${require("../../assets/img-home-01.jpg")})` }}></div>
                </div>
                <div>
                    <div className="col-banners" style={{ backgroundImage: `url(${require("../../assets/img-home-02.jpg")})` }}></div>
                </div>
                <div>
                    <div className="col-banners" style={{ backgroundImage: `url(${require("../../assets/img-home-03.jpg")})` }}></div>
                </div>
            </Carousel>
        </div>
    );

}