import React from "react"
import { Icon } from "antd"
import "./styles/ToonCard.css"

const ToonCardPlaceholder = () => (
  <div className="ToonCard ToonCard--Placeholder">
    <div className="ToonCard__image ToonCard__image--placeholder">
      <Icon type="loading" />
    </div>
    <p className="ToonCard__name ToonCard__name--Placeholder" />
  </div>
)

export { ToonCardPlaceholder }
