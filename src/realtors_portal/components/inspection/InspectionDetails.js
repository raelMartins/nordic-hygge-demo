import React from 'react';
import {Heading, HStack, Image, Input, Select, Text, VStack} from '@chakra-ui/react';
import PropertyInfo from '/src/realtors_portal/components/users/PropertyDetails';
import backArrow from '/src/realtors_portal/images/icons/back-arrow.png';
import Filter from '/src/realtors_portal/components/inspection/history/filter';
import emptyIcon from '/src/realtors_portal/images/icons/emptyIcon.svg';

export const InspectionDetails = ({data, setAddedParam}) => {
  const [filtered, setFiltered] = React.useState({topic: 'all', date: 'all'});

  const handleOptions = e => {
    return;
    const {name, value} = e.target;
    setFiltered({...filtered, [name]: value});
  };

  const paginate = (data, itemsInPage) => {
    const numOfPage = Math.ceil(data.length / itemsInPage);
    const paginatedArray = Array.from({length: numOfPage}, (_, index) => {
      const start = index * numOfPage;
      return data.slice(start, start + itemsInPage);
    });
    return paginatedArray;
  };

  const getDays = array => {
    let arr = array?.map(item => {
      return item.day;
    });
    let set = new Set(arr);
    return [...set];
  };

  const groupByDay = (prop, fil) => {
    let groups = getDays(prop);
    const group = groups.map(item => {
      let obj = {};
      let filtered;

      const isOptionAvailable = prop => {
        const isDateAvailable = () => {
          const forMonth = (p, t) => {
            const m = new Date(p);
            m.setHours(0, 0, 0, 0);
            const now = new Date();

            const nowT = new Date(now.getFullYear(), now.getMonth() - t, now.getDate());
            return nowT <= m;
          };

          const forDay = (p, t) => {
            const nowT = new Date(p);
            const m = new Date();
            const d = new Date(m - t * 24 * 60 * 60 * 1000);
            nowT.setHours(0, 0, 0, 0);
            d.setHours(0, 0, 0, 0);
            if (t === 7) {
              return nowT >= d;
            } else {
              return nowT == d;
            }
          };

          let boo;
          switch (fil.date) {
            case 'Yesterday':
              boo = forDay(prop.time_ago, 1);
              break;
            case 'last Week':
              boo = forDay(prop.time_ago, 7);
              break;
            case 'Last 1 month':
              boo = forMonth(prop.time_ago, 1);
              break;
            case 'Last 2 month':
              boo = forMonth(prop.time_ago, 2);
              break;
            case 'Last 3 month':
              boo = forMonth(prop.time_ago, 3);
              break;
            default:
              boo = true;
              break;
          }

          return boo;
        };

        const isTopicAvailable = () => {
          if (fil.topic === 'all') {
            return true;
          } else {
            return prop.topic === fil.topic;
          }
        };
        return isDateAvailable() && isTopicAvailable();
      };

      if (fil.date === 'all' && fil.topic === 'all') {
        filtered = prop.filter(data => {
          return data.day === item;
        });

        obj.day = item;
        obj.info = filtered;
      } else {
        filtered = prop.filter(data => {
          return data.day === item && isOptionAvailable(data);
        });
        if (filtered.length < 1) {
          obj = null;
        } else {
          obj.day = item;
          obj.info = filtered;
        }
      }
      return obj;
    });
    return group;
  };

  const [count, setCount] = React.useState(1);

  const handleArrow = (e, direct) => {
    let add = ~~count + 1 > paginate(data, 10)?.length ? null : setCount(~~count + 1);

    if (e) {
      return ~~e.target.value > paginate(data, 10)?.length
        ? setCount(paginate(data, 10)?.length)
        : e.target.value === ''
        ? setCount(e.target.value)
        : ~~e.target.value < 1
        ? setCount(1)
        : setCount(e.target.value);
    }

    if (direct === 'left') {
      let sub = count - 1 < 1 ? null : setCount(count - 1);
      return sub;
    }
    return add;
  };

  return (
    <VStack w="full" minW="888px" spacing="22px">
      <HStack w="100%" justify="space-between">
        <Heading as="h1" fontSize="20px" fontWeight="700">
          Inspection History
        </Heading>

        <HStack>
          {paginate(data, 10)?.length > 1 && (
            <HStack>
              <HStack w="fit-content" onClick={() => handleArrow('', 'left')}>
                <Image
                  zIndex={1000}
                  style={{cursor: 'pointer'}}
                  height="50px"
                  w="50px"
                  borderRadius="full"
                  filter={`brightness(${~~count === 1 ? '106%' : '100%'})`}
                  src={backArrow.src}
                  alt="left_arrow"
                />
              </HStack>
              <Input
                type="text"
                value={count}
                // disabled={count === paginate(data, 10).length}
                w="44px"
                onChange={e => handleArrow(e, '')}
                onBlur={e => e.target.value === '' && setCount(1)}
                borderRadius="16px"
                px="10px"
                h="50px"
                textAlign="center"
                fontSize="16px"
                fontWeight="500"
                color="#191919"
              />
              <HStack w="fit-content" onClick={() => handleArrow('', '')}>
                <Image
                  borderRadius="full"
                  zIndex={1000}
                  style={{cursor: 'pointer', transform: 'rotate(180deg)'}}
                  height="50px"
                  w="50px"
                  filter={`brightness(${~~count === paginate(data, 10).length ? '106%' : '100%'})`}
                  src={backArrow.src}
                  bg="#E4E4E4"
                  alt="left_arrow"
                />
              </HStack>
              <Text as="span" fontSize="16px" fontWeight="400">
                {paginate(data, 10)?.length}
              </Text>
            </HStack>
          )}

          <Filter setUrl={setAddedParam} />
        </HStack>
      </HStack>
      <VStack w="full" spacing="24px" bg="#FFFFFF" borderRadius="16px" px="27px" py="27px">
        {data?.length ? (
          paginate(data, 10)[~~count - 1]?.map((item, index) => (
            <PropertyInfo key={index} data={item} />
          ))
        ) : (
          <>
            <Image alt="empty table icon" src={emptyIcon.src} />
            <Text
              w="full"
              textAlign="center"
              fontSize="14px"
              fontWeight="400"
              color="#606060"
              mx="auto"
            >
              No data available
            </Text>
          </>
        )}
      </VStack>
    </VStack>
  );
};

export default InspectionDetails;
