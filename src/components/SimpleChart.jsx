const SimpleChart = ({ data, type, xKey, yKey, color, colors }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        No data available
      </div>
    )
  }

  const maxValue = type === 'bar' && Array.isArray(yKey)
    ? Math.max(...data.map(d => Math.max(...yKey.map(key => d[key] || 0))))
    : Math.max(...data.map(d => d[yKey] || 0))

  if (type === 'line') {
    return (
      <div className="h-64 flex items-end justify-between space-x-2">
        {data.map((point, index) => {
          const height = maxValue > 0 ? (point[yKey] / maxValue) * 200 : 0
          return (
            <div key={index} className="flex flex-col items-center">
              <div className="relative">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ 
                    backgroundColor: color,
                    marginBottom: `${height}px`
                  }}
                />
                {index < data.length - 1 && (
                  <div
                    className="absolute top-1/2 left-3 h-0.5"
                    style={{
                      backgroundColor: color,
                      width: '20px'
                    }}
                  />
                )}
              </div>
              <span className="text-xs text-gray-600 mt-2">{point[xKey]}</span>
            </div>
          )
        })}
      </div>
    )
  }

  if (type === 'bar') {
    return (
      <div className="h-64">
        <div className="flex items-end justify-between h-56 space-x-1">
          {data.map((point, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className="w-full flex justify-center space-x-1">
                {Array.isArray(yKey) ? yKey.map((key, keyIndex) => {
                  const height = maxValue > 0 ? (point[key] / maxValue) * 200 : 0
                  return (
                    <div
                      key={key}
                      className="w-4 rounded-t"
                      style={{
                        height: `${height}px`,
                        backgroundColor: colors[keyIndex]
                      }}
                    />
                  )
                }) : (
                  <div
                    className="w-8 rounded-t"
                    style={{
                      height: `${maxValue > 0 ? (point[yKey] / maxValue) * 200 : 0}px`,
                      backgroundColor: color
                    }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          {data.map((point, index) => (
            <span key={index} className="text-xs text-gray-600 text-center flex-1">
              {point[xKey]}
            </span>
          ))}
        </div>
      </div>
    )
  }

  return null
}

export default SimpleChart