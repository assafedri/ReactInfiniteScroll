import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Panel from './components/Panel/Panel';
import Images from './components/Images/Images';
import Modal from './components/Modal/Modal';
import './App.scss';
import Spinner from './components/Spinner/Spinner';

function App() {
	const [loading, setLoading] = useState(false)
	const [images, setImages] = useState([]);
	const [albums, setAlbums] = useState([]);
	const [page, setPage] = useState(1);
	const [currentImg, setCurrentImg] = useState();
	const [currentAlbum, setCurrentAlbum] = useState()
	const [displayModal, setDisplayModal] = useState(false);
	const limit = 20;

	const fetchImages = (showLoading = true) => {
		setLoading(showLoading)
		axios.get(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${limit}`)
		.then( response => {
			setImages(images.concat(response.data));
			setPage(page + 1);
			setLoading(false)
		})
		.catch( error => {
			setLoading(false)
			console.log(error)
		}) 
	}
	const fetchAlbums = () => {
		setLoading(true)
		axios.get(`https://jsonplaceholder.typicode.com/albums`)
		.then( response => {
			setAlbums(response.data);
			setLoading(false)
		})
		.catch( error => {
			setLoading(false)
			console.log(error)
		}) 
	}

	// After component mount, get initial images and all albums
	// The 'disable next line' comment is there to remove the warning message about dependencies 
	useEffect( () => {
		fetchImages();
		fetchAlbums();
		//eslint-disable-next-line
	},[])

	// Open Modal
	const imageClickedHandler = (img) => {
		setCurrentImg(img)
		setDisplayModal(true);
	}

	// Close modal handler
	const closeModal = () => {
		setDisplayModal(false);
		setCurrentImg(null)
	}

	// What will happen when selecting album from the dropdown.
	// If there's an ablbum - show all photos without infiniteScroll.
	// If not - clear all, show the initial photos - with InfiniteScoll enabled.
	const onChangedAlbum = e => {
		const albumId = parseInt(e.target.value);
		let albumImages = [];
		if(albumId){
			setLoading(true)
			axios.get(`https://jsonplaceholder.typicode.com/photos`)
			.then( response => {
				albumImages = response.data.filter(img => img.albumId === albumId);
				setImages(albumImages);
				setCurrentAlbum(albums.find(album => album.id === albumId));
				setPage(1);
				setLoading(false)
			})
			.catch( error => {
				setLoading(false)
				console.log(error)
			}) 
		}else{
			setLoading(true)
			axios.get(`https://jsonplaceholder.typicode.com/photos?_page=1&_limit=${limit}`)
			.then( response => {
				setImages(response.data);
				setCurrentAlbum(false);
				setPage(page + 1);
				setLoading(false)
			})
			.catch( error => {
				setLoading(false)
				console.log(error)
			}) 
		}
	}

	// Get the album title by given id in order to display it in the modal
	const getAlbumTitleById = img => {
		return albums.find(album => album.id === img.albumId).title;
	}

	return (
		<div className="App">
			<Panel 
				albums={albums} 
				images={images} 
				albumChanged={onChangedAlbum}
			/>
			{loading 
			? <Spinner message="Loading data fro API..." /> 
			: <Images 
					images={images} 
					fetch={() => fetchImages(false)} 
					clicked={ img => imageClickedHandler(img) }
					currentAlbum={currentAlbum}/>
			}			
			<Modal 
				show={displayModal} 
				closed={closeModal}
				image={currentImg} 
				albumTitle={() => getAlbumTitleById(currentImg)}
			/>
		</div>
  	);
}

export default App;