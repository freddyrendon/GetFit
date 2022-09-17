import { Link } from 'react-router-dom'
import React from 'react'
import './regimen_index_item.css'
import { HiOutlineTrash } from '@react-icons/all-files/hi/HiOutlineTrash'


class RegimenIndexItem extends React.Component{
  constructor(props){
    super(props)
    this.calcAvg = this.calcAvg.bind(this)
    this.renderDelete = this.renderDelete.bind(this);
  }

  componentDidMount() {
    
  }

  renderDelete(creator) {
    if (this.props.state.session.user.username && 
      this.props.state.session.user.username === creator[0]) {
      return (
      <button id = "add-exrc-info-button" className = "button-submit" onClick = {() => this.props.openModal(["delete_confirm", creator[1]])}>
        <HiOutlineTrash />
      </button >
      )
    } else {
      return "";
    }
  }

  calcAvg(exrcs) {
    let sum = 0;
    let x = 0;
    let y = 0;
    let diff;
    let diffWord;
    for (let i = 0; i < exrcs.length; i++) {
      if (exrcs[i] === 'Beginner') {
        x = 1;
      } else if(exrcs[i] === "intermediate") {
        x = 2;
      } else if(exrcs[i] === 'Advanced') {
        x = 3;
      }
      y++;
      sum += x;
    }
    diff = sum/y;
    diffWord = diff + ""
    return diffWord.slice(0,4);
  }
  

  render(){

    let muscles = this.props.regimen.exercise_ids.map(exercise => exercise.muscle ? exercise.muscle + " " : " ");
    let exercises = this.props.regimen.exercise_ids.map(exercise => exercise.name ? exercise.name + ", \n": " ");
    let uniqueMuscles = [...new Set(muscles)];
    let user = "Steve"
    let muscTitle = "Muscle Groups: "
    let diff = this.props.regimen.exercise_ids.map(exercise => exercise.difficulty ? exercise.difficulty : " ");
   
    


    // let user = this.props.regimen.creator





    return(
      <div className="regimen-index-item-container">
        <div className='regi-idx-title-auth'>
          <div> Regimen: &nbsp;
            <Link className="regimen-index-item-title" to={`/regimens/${this.props.regimen._id}`}>
              {this.props.regimen.title}
            </Link>
          </div>
          <div className='regi-auth'>
            Creator: &nbsp;
            {user}
          </div>
        </div>

        <div className='regimen-index-item'>
          <div className='regi-idx-exrc-cont'>
            <div className='regi-idx-exrc-title'>
              Exercises:
            </div>
            <div className='reg-shw-exrc-list'>
              {exercises}
            </div>
          </div>

          <div className='regi-idx-musc-cont'>
            <div className='regi-idx-musc-title'>
              {muscTitle}
            </div>
            <div className='reg-shw-musc-list'>
              {uniqueMuscles}
              {this.calcAvg(diff)}
              {this.renderDelete([this.props.regimen.creator, this.props.regimen.title])}
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default RegimenIndexItem;
