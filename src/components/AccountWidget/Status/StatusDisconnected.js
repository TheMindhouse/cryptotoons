// @flow
import React from "react"
import { Alert } from "antd"

export const StatusDisconnected = () => (
  <Alert
    message="Log in to MetaMask"
    description="Ethereum available but not connected"
    type="error"
    showIcon
  />
)
