import React, { useState, useEffect } from 'react'
import BasicConfig from './components/Basic'
import FilterComp from './components/Filter'
import useDebounce from "@src/hooks/useDebounce";
import './index.scss'

interface CollectionConfigProps {
  handleChange: any,
  templateOption: any
}

const CollectionConfig: React.FC<CollectionConfigProps> = ({
  handleChange,
  templateOption
}) => {
  const [formData, setFormData] = useState<any>(templateOption);
  const shwoModeHandle = (type: string, payload: any) => {
    const data = {
      ...formData,
      [type]: payload
    }
    setFormData(data)
    emitUpdate(data)
  }

  const handleFilterChange = (type: string, payload: any) => {

    if (type === 'attrFilter') {
      const data = {
        ...formData,
        filters: payload
      }
      setFormData(data)
      emitUpdate(data)
      return
    }

    if (type === 'typeFilter') {
      const data = {
        ...formData,
        selectTypeFilters: payload
      }
      setFormData(data)
      emitUpdate(data)
      return
    }

    const aryKey = type.split('.')
    const oldFilter = formData[aryKey[0]]
    const newFilter = {
      ...oldFilter,
      [aryKey[1]]: payload
    }
    const data = {
      ...formData,
      [aryKey[0]]: newFilter,
    }
    setFormData(data)
    emitUpdate(data)
  }

  const onDelFilter = (type) => {
    formData[type] = null
    const data = {
      ...formData,
    }
    console.log(data)
    setFormData(data)
    emitUpdate(data)
  }

  const emitUpdate = useDebounce((data) => {
    handleChange && handleChange(data)
  }, 1000)
  useEffect(() => {
    setFormData(templateOption)
  }, [templateOption])
  return (
    <div className="config-item-wrapper">
      <BasicConfig data={formData} onChange={shwoModeHandle} />
      <FilterComp
        data={formData}
        onChange={shwoModeHandle}
        filterChange={handleFilterChange}
        onDelFilter={onDelFilter}
      />
    </div>
  )
}

export default CollectionConfig