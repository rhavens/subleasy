class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
	devise :database_authenticatable, :registerable,
    		:recoverable, :rememberable, :trackable, :validatable,
    		:omniauthable, :omniauth_providers => [:facebook]
    has_many :offers, dependent: :destroy, class_name: 'Offer'
    validates_format_of :email, :with => /\A^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+[a-zA-Z0-9._%+-]\.+[a-zA-Z0-9._%+-]+$\Z/i

  # added like support
  has_many :likes

  def likes?(offer)
    offer.likes.where(user_id: id).any?
  end

  def self.find_for_facebook_oauth(auth, signed_in_resource = nil)
    user = User.where(provider: auth.provider, uid: auth.uid).first
    if user.present?
      user
    else
      user = User.create(name:auth.info.name,
                         provider:auth.provider,
                         uid:auth.uid,
                         email:auth.info.email,
                         password:Devise.friendly_token[0,20])
    end
	end

	def self.new_with_session(params, session)
		super.tap do |user|
		  if data = session["devise.facebook_data"] && session["devise.facebook_data"]["extra"]["raw_info"]
		    user.email = data["email"] if user.email.blank?
		    user.name = data["name"] if user.name.blank?
		  end
		end
	end	

end
