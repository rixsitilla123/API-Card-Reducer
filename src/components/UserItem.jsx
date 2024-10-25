import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Card } from 'antd';
const { Meta } = Card;
const UserItem = ({ item, handleLikedBtnClick, handleSavedBtnClick }) => (
	<Card
		style={{ width: 300 }}
		cover={<img alt="img" src={item.image} />}
		actions={[
			<HeartOutlined onClick={handleLikedBtnClick} className="scale-[1.2]" />,
			<ShoppingCartOutlined onClick={handleSavedBtnClick} className="scale-[1.2]" />
		]}
	>
		<Meta
			title={`${item.firstName} - ${item.lastName}`}
			description={item.email}
		/>
	</Card>
);
export default UserItem;