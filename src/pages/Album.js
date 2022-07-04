import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      album: {},
      getAlbum: [],
    };
    this.listMusics();
  }

 listMusics = async () => {
   const { match } = this.props;
   const music = await getMusics(match.params.id);
   this.setState({
     getAlbum: music,
     album: music[0],
   });
 }

 render() {
   const { album, getAlbum } = this.state;
   return (
     <div
       data-testid="page-album"
     >
       <Header />
       <h2>Lista de Músicas</h2>

       <section>
         <div>
           <img src={ album.artworkUrl100 } alt="Imagem do Album" />
           <h2 data-testid="album-name">{album.collectionName}</h2>
           <h3 data-testid="artist-name">{album.artistName}</h3>
         </div>
         <MusicCard getAlbum={ getAlbum } />

       </section>

     </div>
   );
 }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
