const diaperChangeState = require('./diaperChangeState.json')


class DiaperChangingState {

  constructor (botRef) {

    this.botRef = botRef
    this.diaperChangeResponse = diaperChangeState.response
    this.requestChangingIntervalID = setInterval(this.requestDiaperChangeMessage.bind(this), diaperChangeState.messageInterval)
    
    let len = diaperChangeState.eventInterval.length
    let ran = Math.floor(Math.random()* len)
    setTimeout(this.botRef.changeToNormalState.bind(this.botRef), diaperChangeState.eventInterval[ran])
}

  onCommand (cmdName) {

    let ageGroup = this.botRef.getAgeGroup()
    
    if(!this.diaperChangeResponse[cmdName]){
            
        cmdName = "NoCommandFound"

    }

    let listLength = this.diaperChangeResponse[cmdName][ageGroup].length
    let ranNum = Math.floor(Math.random() * listLength)

    let response = this.diaperChangeResponse[cmdName][ageGroup][ranNum]

    if (cmdName === 'Change') {
        clearInterval(this.requestChangingIntervalID)
        this.botRef.changeToNormalState()      
    }

    return ["chat", response]
  }

  requestDiaperChangeMessage(){

    this.botRef.babyBotChannel.toHandler("","",diaperChangeState.cryingMessage)

  }

}

module.exports = DiaperChangingState