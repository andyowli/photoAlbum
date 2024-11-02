import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import '../App.css';

// Define the structure of an image object
interface Image {
  id: number;
  randNum: number;
  src: string;
}

const Pantone: React.FC = () => {
    const nodeRef = React.useRef(null); // 处理 findDOMNode 警告
    const [images, setImages] = useState<Image[]>([]); // 存储图像的状态
    const [usedImages, setUsedImages] = useState<number[]>([]); // 跟踪已使用的图像
    const imageCount = 99; // Total number of images

    // 获取图像数据并生成卡片
    useEffect(() => {
        fetch(
        'https://raw.githubusercontent.com/Margaret2/pantone-colors/master/pantone-colors.json'
        )
        .then((res) => res.json())
        .then((data) => {
            const imageCards: Image[] = [];
            for (let i = 0; i < imageCount; i++) {
                const randNum = getRandomImageIndex();
                imageCards.push({
                    id: i,
                    randNum: randNum,
                    src: `image/${padNumber(randNum)}.jpg`,
                });
            }
            setImages(imageCards);
        })
        .catch((err) => {
            console.error(err);
        });
    }, []);

    // 生成用于图像选择的随机数
    const getRandomImageIndex = (): number => {
        let randNum = Math.ceil(Math.random() * imageCount);
        while (usedImages.includes(randNum)) {
            randNum = Math.ceil(Math.random() * imageCount);
        }
        setUsedImages((prev) => [...prev, randNum]);
        return randNum;
    };

    // 将数字填充为两位数字（例如01、02等）
    const padNumber = (number: number): string => {
        return number.toString().padStart(2, '0');
    };

    // 随机分散卡片的功能
    const scatterStyle = (): React.CSSProperties => {
        const rNum = Math.random() * 50 - 2;
        const x = Math.random() * 50 - 5;
        const y = Math.random() * 50 - 5;

        return {
            transform: `rotate(${rNum}deg)`,
            top: `${x}px`,
            left: `${y}px`,
        };
    };

    return (
        <div className="container">
        {images.map((image) => (
            <Draggable key={image.id} nodeRef={nodeRef}>
            <div className="card" style={scatterStyle()} ref={nodeRef}>
                <img src={image.src} alt={`Image ${image.randNum}`} className="image" />
                <div className="color-codes">
                <h1>{padNumber(image.randNum)}</h1>
                </div>
            </div>
            </Draggable>
        ))}
        </div>
    );
};

export default Pantone;
