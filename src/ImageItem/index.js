import './index.css'

const ImageItem = props => {
  const {eachItem, onChangeActiveImg} = props
  const {id, imageUrl, thumbnailUrl, category} = eachItem
  const onChangeImg = () => {
    onChangeActiveImg(imageUrl)
  }

  return (
    <li>
      <button className="thumb-button" type="button">
        <img
          src={thumbnailUrl}
          onClick={onChangeImg}
          alt="thumbnail"
          className="thumbnail-image"
        />
      </button>
    </li>
  )
}

export default ImageItem
