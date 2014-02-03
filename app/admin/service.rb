ActiveAdmin.register Service do
  index do
    column :name
    default_actions
  end

  form do |f|
    f.inputs do
      f.input :name
      f.input :description
      f.input :background, as: :file
    end
    f.actions
  end
end
