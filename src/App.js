import React from "react"
import logo from "./logo.svg"
import "./App.css"
import InfiniteScroll from "react-infinite-scroll-component"
import axios from "axios"
import ProgressiveImage from "react-progressive-image"
import Lightbox from "react-image-lightbox"
import "react-image-lightbox/style.css"

const imageList = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTng3R88YgXx_NN-zb9Zkjr1mCNJqgfWSsh3V3lh9polLzR5I_&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTng3R88YgXx_NN-zb9Zkjr1mCNJqgfWSsh3V3lh9polLzR5I_&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTng3R88YgXx_NN-zb9Zkjr1mCNJqgfWSsh3V3lh9polLzR5I_&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTng3R88YgXx_NN-zb9Zkjr1mCNJqgfWSsh3V3lh9polLzR5I_&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTng3R88YgXx_NN-zb9Zkjr1mCNJqgfWSsh3V3lh9polLzR5I_&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTng3R88YgXx_NN-zb9Zkjr1mCNJqgfWSsh3V3lh9polLzR5I_&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTng3R88YgXx_NN-zb9Zkjr1mCNJqgfWSsh3V3lh9polLzR5I_&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTng3R88YgXx_NN-zb9Zkjr1mCNJqgfWSsh3V3lh9polLzR5I_&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTng3R88YgXx_NN-zb9Zkjr1mCNJqgfWSsh3V3lh9polLzR5I_&s"
]
const api = {
  baseUrl: "https://api.soundcloud.com",
  client_id: "caf73ef1e709f839664ab82bef40fa96"
}

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      imageList: [],
      hasMoreItems: true,
      nextHref: null,
      photoIndex: 0,
      isOpen: false
    }
  }

  async componentDidMount() {
    const data = await axios.get("/api/upload")
    console.log(data)
    this.setState({ imageList: data.data })
  }
  async loadItems(page) {
    // console.log("TEst")
    // const list = [
    //   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTng3R88YgXx_NN-zb9Zkjr1mCNJqgfWSsh3V3lh9polLzR5I_&s",
    //   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTng3R88YgXx_NN-zb9Zkjr1mCNJqgfWSsh3V3lh9polLzR5I_&s",
    //   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTng3R88YgXx_NN-zb9Zkjr1mCNJqgfWSsh3V3lh9polLzR5I_&s",

    // ]
    // this.setState({imageList : [...this.state.imageList , ...list]})
    const data = await axios.get("/api/upload")
    console.log(data)
    this.setState({ imageList: [...this.state.imageList, ...data.data] })
  }

  render() {
    const { imageList, photoIndex, isOpen } = this.state
    const loader = <div className="loader">Loading ...</div>
    console.log(photoIndex)
    return (
      <div className="App">
        Gallery
        <div>
          <InfiniteScroll
            dataLength={this.state.imageList.length}
            next={this.loadItems.bind(this)}
            hasMore={true}
            scrollableTarget="content"
            style={{ overflow: "unset", padding: "4px" }}
            loader={<h4>Loading...</h4>}
            // loader={loader}
          >
            <div className="tracks">
              {this.state.imageList.map((val, index) => (
                <ProgressiveImage src={val} placeholder={val}>
                  {src => (
                    <img
                      onClick={() =>
                        this.setState({ isOpen: true, photoIndex: +index })
                      }
                      src={src}
                      alt="an image"
                      width="300"
                      height="275"
                    />
                  )}
                </ProgressiveImage>
              ))}
            </div>
          </InfiniteScroll>
        </div>
        {isOpen && (
          <Lightbox
            discourageDownloads={true}
            animationDisabled={true}
            animationOnKeyInput={true}
            imageTitle={<div>Test</div>}
            imageCaption={<div style={{display:"flex", justifyContent:"space-between"}}>
              <div>dsad</div>
              <div>test</div>
            </div>}
            mainSrc={imageList[photoIndex]}
            nextSrc={imageList[(photoIndex + 1) % imageList.length]}
            prevSrc={
              imageList[(photoIndex + imageList.length - 1) % imageList.length]
            }
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex:
                  (photoIndex + imageList.length - 1) % imageList.length
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % imageList.length
              })
            }
          />
        )}
      </div>
    )
  }
}

export default App
