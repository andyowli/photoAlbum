import { useEffect, useState } from 'react';
import './rhombus.css';

interface Image {
    id: number;
    randNum: number;
    src: string;
  }

export default function RhombusAlbum() {
    const imageCount = 99;
    // const imageCards: Image[] = [];
    const [rhombusImage, setrhombusImage] = useState<Image[]>([]); // 存储图像的状态
    const [usedImages, setUsedImages] = useState<number[]>([]); // 跟踪已使用的图像



    // 将数字填充为两位数字（例如01、02等）
    const padNumber = (number: number): string => {
        return number.toString().padStart(2, '0');
    };

    // 生成用于图像选择的随机数
    const getRandomImageIndex = (): number => {
        let randNum = Math.ceil(Math.random() * imageCount);
        while (usedImages.includes(randNum)) {
            randNum = Math.ceil(Math.random() * imageCount);
        }
        setUsedImages((prev) => [...prev, randNum]);
        return randNum;
    };

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
                setrhombusImage(imageCards);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);


    return (
        <div className="shell">
            {rhombusImage.map((image) => (
                <div className="box" key={image.id}>
                    <img src={image.src} />
                </div>
            ))}
        </div>
    )
}