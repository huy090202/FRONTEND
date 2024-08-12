import { useState } from 'react';

function App() {
    const [images, setimages] = useState([]);

    const handleUploadFilesImage = (e) => {
        const files = e.target.files;
        const images = [];
        for (let i = 0; i < files.length; i++) {
            images.push(URL.createObjectURL(files[i]));
        }
        setimages(images);
    };

    const handleReviewImage = () => {
        return [...images].map((image, index) => (
            <div key={index}>
                <img src={image} className='size-52' />
            </div>
        ));
    };

    return (
        <div className='py-60 px-10 text-center bg-slate-600 text-white h-screen'>
            <h1 className='text-3xl font-bold'>Test upload and review image</h1>
            <div className='text-2xl my-10'>Choose image: </div>
            <input type='file' multiple accept='image/*' onChange={handleUploadFilesImage} />
            <div className='flex justify-center items-center w-full my-10 gap-5'>
                {handleReviewImage()}
            </div>
        </div>
    );
}

export default App;
