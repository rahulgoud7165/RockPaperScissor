import {Component} from 'react'
import Popup from 'reactjs-popup'
import {RiCloseLine} from 'react-icons/ri'
import Buttons from '../Buttons'
import GameResultView from '../GameResultView'
import 'reactjs-popup/dist/index.css'
import {
  MainContainer,
  ScoreContainer,
  ItemsContainer,
  Heading,
  ScoreCardContainer,
  ParagraphScore,
  ScoreSpan,
  ItemsImagesContainer,
  PlayAgainButton,
  PopupContainier,
  PopUpButton,
  RulesImagesContainer,
  RulesImage,
  CloseLineContainer,
  CloseLineButton,
} from './StyledComponents'

class Game extends Component {
  state = {
    showResults: false,
    myChoice: {},
    apponentChoice: {},
    score: 0,
    resultMessage: '',
  }
  onClickPlayAgain = () => {
    this.setState({showResults: false})
  }
  onGetResult = () => {
    const {myChoice, apponentChoice, resultMessage} = this.state
    const {id, image} = apponentChoice
    return (
      <GameResultView
        myChoice={myChoice}
        apponentChoice={apponentChoice}
        resultMessage={resultMessage}
        playAgain={this.onClickPlayAgain}
      />
    )
  }
  onGetButtonId = (id, image) => {
    const {choicesList} = this.props
    const number = Math.floor(Math.random() * choicesList.length)
    if (choicesList[number].id === 'ROCK' && id === 'SCISSORS') {
      this.setState(prevState => ({
        showResults: true,
        myChoice: [id, image],
        apponentChoice: choicesList[number],
        score: prevState.score - 1,
        resultMessage: 'YOU LOSE',
      }))
    } else if (choicesList[number].id === 'ROCK' && id === 'PAPER') {
      this.setState(prevState => ({
        showResults: true,
        myChoice: [id, image],
        apponentChoice: choicesList[number],
        score: prevState.score + 1,
        resultMessage: 'YOU WON',
      }))
    } else if (choicesList[number].id === 'SCISSORS' && id === 'ROCK') {
      this.setState(prevState => ({
        showResults: true,
        myChoice: [id, image],
        apponentChoice: choicesList[number],
        score: prevState.score + 1,
        resultMessage: 'YOU WON',
      }))
    } else if (choicesList[number].id === 'SCISSORS' && id === 'PAPER') {
      this.setState(prevState => ({
        showResults: true,
        myChoice: [id, image],
        apponentChoice: choicesList[number],
        score: prevState.score - 1,
        resultMessage: 'YOU LOSE',
      }))
    } else if (choicesList[number].id === 'PAPER' && id === 'SCISSORS') {
      this.setState(prevState => ({
        showResults: true,
        myChoice: [id, image],
        apponentChoice: choicesList[number],
        score: prevState.score + 1,
        resultMessage: 'YOU WON',
      }))
    } else if (choicesList[number].id === 'PAPER' && id === 'ROCK') {
      this.setState(prevState => ({
        showResults: true,
        myChoice: [id, image],
        apponentChoice: choicesList[number],
        score: prevState.score - 1,
        resultMessage: 'YOU LOSE',
      }))
    } else {
      this.setState({
        showResults: true,
        myChoice: [id, image],
        apponentChoice: choicesList[number],
        resultMessage: 'IT IS DRAW',
      })
    }
  }
  onGetImage = () => {
    const {choicesList} = this.props
    return (
      <ItemsImagesContainer>
        {choicesList.map(eachItem => (
          <Buttons
            key={eachItem.id}
            buttonDetails={eachItem}
            onGetId={this.onGetButtonId}
          />
        ))}
      </ItemsImagesContainer>
    )
  }
  render() {
    const {score, showResults} = this.state
    return (
      <MainContainer>
        <ScoreContainer>
          <ItemsContainer>
            <Heading>
              Rock
              <br />
              Paper
              <br />
              Scissors
            </Heading>
          </ItemsContainer>
          <ScoreCardContainer>
            <ParagraphScore>Score</ParagraphScore>
            <ParagraphScore>{score}</ParagraphScore>
          </ScoreCardContainer>
        </ScoreContainer>
        {showResults ? this.onGetResult() : this.onGetImage()}
        <PopupContainier>
          <Popup modal trigger={<PopUpButton type="button">Rules</PopUpButton>}>
            {close => (
              <RulesImagesContainer>
                <CloseLineContainer>
                  <CloseLineButton type="button" onClick={() => close()}>
                    <RiCloseLine />
                  </CloseLineButton>
                </CloseLineContainer>
                <RulesImage
                  src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                  alt="rules"
                />
              </RulesImagesContainer>
            )}
          </Popup>
        </PopupContainier>
      </MainContainer>
    )
  }
}
export default Game
