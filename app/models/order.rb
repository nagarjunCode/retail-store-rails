class Order < ApplicationRecord
	belongs_to :customer
	has_many :ordered_item
end
