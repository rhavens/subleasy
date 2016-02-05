class Offer < ActiveRecord::Base
	belongs_to :user, class_name: "User", :foreign_key => "user_id"

	before_validation :squish_whitespace

	validates_presence_of :user,:image,
					:line1,:city,:state,:zip,:rent,:start_date,
					:end_date,:school,:description
	validates :image, :format => URI::regexp(%w(http https))
	validate :dates_make_sense 

	validates_length_of :description, :maximum => 300
	validates_length_of :line1, :maximum => 100
	validates_length_of :line2, :maximum => 100
	validates_length_of :city, :maximum => 50
	validates_length_of :image, :maximum => 255
	
	geocoded_by :full_address
	after_validation :geocode

	def dates_make_sense
		errors.add(:start_date, "and end date need to make logical sense") if (start_date < Date.today) || (start_date > end_date)
	end

	def squish_whitespace
		self.image = self.image.squish()
		self.line1 = self.line1.squish().split.map(&:capitalize).join(' ')
		self.line2 = self.line2.squish()
		self.city = self.city.squish().split.map(&:capitalize).join(' ')
	end

	def full_address
		return (self.line1 + " " + self.city + " " + self.state).squish()
	end		
end
