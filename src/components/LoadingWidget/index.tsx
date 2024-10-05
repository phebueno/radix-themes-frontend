import { ThreeDots } from 'react-loader-spinner'
import './styles/index.css'

const LoadingWidget: React.FC = () => {

    return(<div className="loadingPageBox">
        <ThreeDots visible={true} height="80" width="80" color="#ffffff" radius="9" ariaLabel="three-dots-loading" />
      </div>)
}

export default LoadingWidget;