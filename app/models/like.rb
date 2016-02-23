class Like < ActiveRecord::Base
	belongs_to :user, class_name: 'User', :foreign_key => 'user_id'
	belongs_to :offer, class_name: 'Offer', :foreign_key => 'offer_id'
end
