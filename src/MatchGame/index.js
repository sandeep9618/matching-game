import {Component} from 'react'
import TabItems from '../TabItems'
import ImageItem from '../ImageItem'
import './index.css'

// <MatchGame tabsList={tabsList} imagesList={imagesList} />

class MatchGame extends Component {
  state = {
    activeTab: 'FRUIT',
    activeImg:
      'https://assets.ccbp.in/frontend/react-js/match-game/orange-img.png',
    score: 0,
    time: 60,
    isCompleted: false,
  }

  componentDidMount() {
    this.timerId = setInterval(this.runningTime, 1000)
  }

  runningTime = () => {
    const {time, isCompleted} = this.state
    if (time === 0) {
      this.setState({isCompleted: true})
      clearInterval(this.timerId)
    }
    this.setState(prevS => ({
      time: prevS.time - 1,
    }))
  }

  onChangeTabStatus = tabId => {
    this.setState({activeTab: tabId})
  }

  onChangeActiveImg = imgUrl => {
    const {activeImg} = this.state
    const {imagesList} = this.props
    const randomNumber = Math.floor(Math.random() * imagesList.length)
    if (activeImg === imgUrl) {
      this.setState(prev => ({
        score: prev.score + 1,
        activeImg: imagesList[randomNumber].imageUrl,
      }))
    } else {
      this.setState({isCompleted: true})
      clearInterval(this.timerId)
    }
  }

  resetAll = () => {
    this.setState({
      activeTab: 'FRUIT',
      activeImg:
        'https://assets.ccbp.in/frontend/react-js/match-game/orange-img.png',
      score: 0,
      time: 60,
      isCompleted: false,
    })
    this.timerId = setInterval(this.runningTime, 1000)
  }

  render() {
    const {activeTab, activeImg, score, time, isCompleted} = this.state
    const {imagesList} = this.props
    const {tabsList} = this.props
    const tabItems = imagesList.filter(
      eachItem => eachItem.category === activeTab,
    )
    return (
      <div>
        <div className="nav-bar">
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
            alt="website logo"
            className="logo"
          />
          <div className="score-container">
            <p className="score-para">
              score: <span>{score}</span>
            </p>
            <img
              src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
              alt="timer"
              className="timer-logo"
            />
            <p className="sec-para">{time} sec</p>
          </div>
        </div>
        {isCompleted ? (
          <div className="bg-container">
            <div className="result-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
                alt="trophy"
                className="trophy-img"
              />
              <p className="your-score">Your Score</p>
              <p className="game-score">{score}</p>
              <button
                type="button"
                className="reset-btn"
                onClick={this.resetAll}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
                  alt="reset"
                  className="reset-img"
                />
                PLAY AGAIN
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-container">
            <img src={activeImg} className="match-img" alt="match" />
            <ul className="tab-container">
              {tabsList.map(eachItem => (
                <TabItems
                  eachItem={eachItem}
                  onChangeTabStatus={this.onChangeTabStatus}
                  activeTab={activeTab}
                  key={eachItem.tabId}
                />
              ))}
            </ul>
            <ul className="un-order-list">
              {tabItems.map(eachItem => (
                <ImageItem
                  eachItem={eachItem}
                  onChangeActiveImg={this.onChangeActiveImg}
                  key={eachItem.id}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default MatchGame
