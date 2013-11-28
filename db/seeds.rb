20.times do
  News.create title: 'Example title', preview: 'Example preview', body: 'Example body'
end

3.times do
  Master.create fio: 'Example fio', biography: 'Example biography'
end

3.times do
  Slide.create title: 'Example title', content: 'Example content', href: '#'
end