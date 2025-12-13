import './App.css';
import { Component } from 'react';
import styled from 'styled-components';
import { Modal } from './components/Modal/Modal.jsx';
import { Backdrop } from './components/Backdrop/Backdrop.jsx';
const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background: green;
  color: white;
  margin-left: 45%;
  cursor: pointer;
`;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      news: [],
      loading: true,
      error: null
    };
  }
  componentDidMount() {
    this.fetchNews();
  }
  fetchNews = async () => {
    try {
      this.setState({ loading: true, error: null });
      const storiesResponse = await fetch(
        'https://hacker-news.firebaseio.com/v0/topstories.json'
      );
      const storyIds = await storiesResponse.json();
      const newsPromises = storyIds.slice(0, 4).map(id =>
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
          .then(res => res.json())
      );
      const newsData = await Promise.all(newsPromises);
      const formattedNews = newsData.map((item, index) => ({
        id: item.id,
        title: item.title,
        content: `Автор: ${item.by} | Бали: ${item.score}`,
        url: item.url
      }));
      this.setState({ news: formattedNews, loading: false });
    } catch (error) {
      console.error('Помилка заванаженя новин:', error);
      this.setState({ error: 'Невдача в завантажені', loading: false });
    }
  };
  handleOpenModal = () => {
    this.setState({ isModalOpen: true });
  };
  handleCloseModal = () => {
    this.setState({ isModalOpen: false });
  };
  render() {
    const { isModalOpen, news, loading, error } = this.state;
    return (
      <div className="App">
        <Button onClick={this.handleOpenModal}>
          Показати новини {loading ? 'ПОчекайте трох' : ''}
        </Button>
        {error && <p>{error}</p>}
        {isModalOpen && (
          <Backdrop onClose={this.handleCloseModal}>
            <Modal onClose={this.handleCloseModal}>
              <h2>Топ 7 новин з Хакер Новини</h2>
              {loading ? (
                <p>Завантаження...</p>
              ) : (
                <ul className='list'>
                  {news.map((item) => (
                    <li key={item.id} className='item'>
                      <h3>{item.title}</h3>
                      <p>{item.content}</p>
                      {item.url && (
                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                          Більше інфи →
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </Modal>
          </Backdrop>
        )}
      </div>
    );
  }
}
export default App;