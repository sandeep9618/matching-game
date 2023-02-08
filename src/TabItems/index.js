import './index.css'

const TabItems = props => {
  const {eachItem, onChangeTabStatus, activeTab} = props
  const {tabId, displayText} = eachItem

  const onChangeTab = () => {
    onChangeTabStatus(tabId)
  }

  const tabCs = activeTab === tabId ? 'tab active-tab' : 'tab'

  return (
    <li className="tab-item">
      <button className={tabCs} type="button" onClick={onChangeTab}>
        {displayText}
      </button>
    </li>
  )
}

export default TabItems
