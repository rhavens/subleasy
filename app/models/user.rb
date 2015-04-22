class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
	devise :database_authenticatable, :registerable,
    		:recoverable, :rememberable, :trackable, :validatable
    has_many :offers, dependent: :destroy, class_name: 'Offer'
    validates_format_of :email, :with => /\A^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.edu$\Z/i

end
