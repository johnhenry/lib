-- function Link(el)
--   el.target = string.gsub(el.target, "%.md", ".html")
--   return el
-- end


function Link(el)
    if el.tag == "Link" then
      el.target = string.gsub(el.target, "%.md", ".html")
      el.tag = "a"
      return el
    end
end